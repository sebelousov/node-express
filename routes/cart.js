const { Router } = require('express')

const { 
    getAllTodosFromCart,
    addTodoToCart,
    removeTodoFromCart
 } = require('../controller/cart-controller')

const router = Router()

router.get('/', async (req, res) => {
    const todos = await getAllTodosFromCart(req.user._id)
    
    res.render('cart', {
        title: 'Корзина',
        header: 'Корзина',
        isCart: true, 
        cart: todos
    })
})

router.get('/all', async (req, res) => {
    const cart = await getAllTodosFromCart(req.user._id)
    const cartTodos = cart.todos.map((todo, index) => {
        return {
            index: index + 1,
            todo: todo.todo,
            desc: todo.desc,
            quantity: todo.quantity,
            duration: todo.duration
        }
    })

    res.json({
        cartTodos,
        totalQuantity: cart.totalQuantity,
        totalDuration: cart.totalDuration
    })
})

router.get('/totalquantity', async (req, res) => {
    const cart = await getAllTodosFromCart(req.user._id)
    
    if (cart) {
        const todosQuantity = cart.todos.map((todo) => { 
            return {
                id: todo.todo._id,
                quantity: todo.quantity
            }
        })

        res.json({
            todosQuantity: todosQuantity,
            totalQuantity: cart.totalQuantity
        })
    } else {
        res.json({
            todosQuantity: [],
            totalQuantity: cart.totalQuantity
        })
    }
})

router.post('/add/:id', async (req, res) => {
    const quantity = await addTodoToCart(req.params.id, req.user._id)

    res.json({
        quantity
    })
})

router.delete('/remove/:id', async (req, res) => {
    const quantity = await removeTodoFromCart(req.params.id, req.user._id)
    
    res.json({
        quantity
    })
})

module.exports = router