const Todo = require('../model/Todo')

const getAllTodos = () => {
    return Todo
        .find()
        .lean()
        .then((todos) => {
            return JSON.stringify(todos)
        })
        .catch((err) => console.log(err))
}

const getTodoById = (id) => {
    return Todo
        .findById(id)
        .then((todo) => {
            return JSON.stringify(todo)
        })
        .catch((err) => console.log(err))
}

const saveTodo = (todoObj) => {
    const todo = new Todo(todoObj)
    
    todo
        .save()
        .then((result) => {
            return result
        })
        .catch((err) => console.log(err))
}

const updateTodoById = (id, todo) => {
    Todo
        .findByIdAndUpdate(id, todo)
        .then((result) => {
            return result
        })
        .catch((err) => console.log(err))
}

const deleteTodoById = (id) => {
    Todo
        .findByIdAndDelete(id)
        .then((result) => {
            
            return result
        })
        .catch((err) => console.log(err))
}

module.exports = {
    getAllTodos,
    getTodoById,
    saveTodo,
    updateTodoById,
    deleteTodoById
}