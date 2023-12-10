const User = require('../model/User')

const { getTodoById } = require('../controller/todo-controller')

const getAllTodosFromCart = async (userId) => {
    try {
        const user = await User
            .findById(userId)
            .populate({
                path: 'cart.items.todoId'
            })

        const todos = user.cart.items.map((item) => {
            return {
                todo: {
                    todo: item.todoId.title, 
                    desc: item.todoId.desc, 
                    _id: item.todoId._id.toString()
                },
                quantity: item.count,
                duration: item.todoId.duration
            }
        })

        const totalQuantity = todos.reduce((sum, item) => sum + item.quantity, 0)
        const totalDuration = todos.reduce((sum, item) => sum + item.duration * item.quantity, 0)
        
        return {
            todos: todos, 
            totalQuantity,
            totalDuration
        }
    } catch (e) {
        console.log(e)
    }
}

const addTodoToCart = async (todoId, userId) => {
    const todo = JSON.parse(await getTodoById(todoId))
    const user = await User.findById(userId)

    return await user.addToCart(todo)
}

module.exports = { getAllTodosFromCart, addTodoToCart }