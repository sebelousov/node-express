document.addEventListener('DOMContentLoaded', async (event) => {
    const quantity = await getCartQuantity()

    document.querySelectorAll('.badge')[0].textContent = quantity.totalQuantity || ''

    document.querySelectorAll('.badge').forEach((node, index) => {
        if (index !== 0) {
            node.textContent = isInCart(node.parentElement.dataset.id, quantity.todosQuantity) || ''
        }
    })
})

const $card = document.querySelectorAll('tbody, .card').forEach(element => {
    if (element) {
        element.addEventListener('click', async (event) => {
            const isCartAdd = event.target.classList.contains('cart-add')
            const isCartRemove = event.target.classList.contains('cart-remove')
            
            if (isCartAdd) {
                const node = event.target.classList.contains('badge') ? event.target.parentElement : event.target
                
                node.childNodes[1].textContent = await addTodoInCart(node.dataset.id)
            }
        
            if (isCartRemove) {
                const node = event.target.nextSibling.nextSibling
                const quantity = await removeTodoInCart(node.dataset.id)
                if (document.querySelector('.card')) {
                    node.childNodes[1].textContent = quantity !== 0 ? quantity : ''
                }
            }

            const totalQuantity = await updateTotalQuantity()

            if (
                (isCartAdd || isCartRemove) &&
                totalQuantity === 0 && 
                document.getElementsByTagName('tbody')[0]
                ) {
                document.querySelector('div.container > div').innerHTML = '<p>Корзина пуста.</p>'
            }

            if (
                (isCartAdd || isCartRemove) &&
                document.getElementsByTagName('tbody')[0]
                ) {
                document.querySelector('tbody').innerHTML = await fillTableCart()
            }
        })
    }
})

async function getCartQuantity() {
    return await fetch('/cart/totalquantity')
        .then(res => res.json())
        .catch(err => console.log(err))
}

async function addTodoInCart(id) {
    const { quantity } = await fetch('/cart/add/' + id, {
        method: 'post'
    }).then(res => res.json())
    return quantity
}

async function removeTodoInCart(id) {
    const { quantity } = await fetch('/cart/remove/' + id, {
        method: 'delete'
    }).then(res => res.json())
    return quantity
}

async function fillTableCart() {
    const cart = await fetch('/cart/all', {
        method: 'get'
    }).then(res => res.json())
    
    const table = cart.cartTodos.map((todo) => {
        return `
            <tr>
                <th scope="row">${todo.index}</th>
                <td>${todo.todo.todo}</td>
                <td>${todo.todo.desc}</td>
                <td>${todo.duration}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-light btn-sm cart-remove" data-id="${todo.todo._id}">-</button>
                        <button class="btn btn-light btn-sm cart-add" data-id="${todo.todo._id}">+<span class="badge text-bg-secondary">${todo.quantity}</span></button>
                    </div>
                </td>
            </tr>
        `
    })
    
    table.push(`
            <tr>
                <th scope="row">Итого:</th>
                <td></td>
                <td></td>
                <td>${ cart.totalDuration }</td>
                <td>${ cart.totalQuantity }</td>
            </tr>
    `)

    return table.join('')
}

async function updateTotalQuantity() {
    const { totalQuantity } = await fetch('/cart/totalquantity')
        .then(res => res.json())
        .catch(err => console.log(err))

        document.querySelectorAll('.badge')[0].textContent = totalQuantity !== 0 ? totalQuantity : ''

        return totalQuantity
}

function isInCart(id, todosQuantity) {
    const index = todosQuantity.findIndex(todo => todo.id === id)

    if (index > -1) {
        return todosQuantity[index].quantity
    }
    
    return undefined
}