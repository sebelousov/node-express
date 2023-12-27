const User = require('../model/User')

const { getTodoById } = require('../controller/todo-controller')

const getAllTodosFromCart = async (userId) => {
    try {
        const user = await User
            .findById(userId)
            .populate({
                path: 'cart.items.todoId'
            })

        const todos = user.cart.items.map((item, index) => {
            return {
                todo: {
                    index: index + 1,
                    todo: item.todoId.title, 
                    desc: item.todoId.desc, 
                    _id: item.todoId._id.toString()
                },
                quantity: item.count,
                duration: item.todoId.duration * item.count
            }
        })

        const totalQuantity = todos.reduce((sum, item) => sum + item.quantity, 0)
        const totalDuration = todos.reduce((sum, item) => sum + item.duration, 0)
        
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

    if (todo && user) {
        return await user.addToCart(todo)
    }
}

const removeTodoFromCart = async (todoId, userId) => {
    const user = await User.findById(userId)
    
    if (user.isTodoInCart(todoId)) {
        return await user.removeTodoFromCart(todoId)
    }

    return 0
}

module.exports = { 
    getAllTodosFromCart, 
    addTodoToCart, 
    removeTodoFromCart
}