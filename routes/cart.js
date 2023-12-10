const { Router } = require('express')

const { 
    getAllTodosFromCart,
    addTodoToCart
 } = require('../controller/cart-controller')

const DAO = require('../dao/DAO')
const Cart = require('../entity/Cart')

const router = Router()
const dao = new DAO('cart', 'cart.json')
const cart = new Cart()

router.get('/', async (req, res) => {
    const todos = await getAllTodosFromCart(req.user._id)
    console.log(todos)
    res.render('cart', {
        title: 'Корзина',
        header: 'Корзина',
        isCart: true, 
        cart: todos
    })
})

router.get('/all', async (req, res) => {
    const cart = await getAllTodosFromCart(req.user._id)
    res.json(cart)
})

router.get('/totalquantity', async (req, res) => {
    const cart = await getAllTodosFromCart(req.user._id)
    console.log(cart.todos)
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
    const user = await addTodoToCart(req.params.id, req.user._id)
    const quantity = user
        .cart
        .items
        .filter((i) => i.todoId.toString() === req.params.id)[0]
        .count

    res.json({
        quantity
    })
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