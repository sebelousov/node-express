const { Router } = require('express')
const DAO = require('../dao/DAO')
const Cart = require('../entity/Cart')

const router = Router()
const dao = new DAO('cart', 'cart.json')
const cart = new Cart()

router.get('/', async (req, res) => {
    cart.setCartTodos(await dao.readCart())
    res.render('cart', {
        title: 'Корзина',
        header: 'Корзина',
        isCart: true, 
        cart: cart.getCartTodos()
    })
})

router.get('/all', async (req, res) => {
    cart.setCartTodos(await dao.readCart())

    res.json(cart)
})

router.get('/totalquantity', async (req, res) => {
    cart.setCartTodos(await dao.readCart())
    
    if (cart.getTotalQuantity()) {
        const todosQuantity = cart.getTodos().map((todo) => { 
            return {
                id: todo.todo.id,
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
    cart.setCartTodos(await dao.readCart())
    const todo = await dao.getTodoById(req.params.id)
    
    cart.addTodo(todo)
    dao.saveCart(cart.getCartTodos())
    
    res.json(cart.getQuantityOfTodoFromCart(todo))
})

router.delete('/remove/:id', async (req, res) => {
    cart.setCartTodos(await dao.readCart())
    const todo = await dao.getTodoById(req.params.id)
    const quantity = cart.getQuantityOfTodoFromCart(todo)
    
    if (quantity) {
        cart.deleteTodo(todo)
        dao.saveCart(cart.getCartTodos())
    }

    res.json(cart.getQuantityOfTodoFromCart(todo))
})

module.exports = router