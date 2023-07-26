const { Router } = require('express')
const {
    getAllTodos,
    getTodoById,
    saveTodo,
    updateTodoById,
    deleteTodoById
} = require('../controller/todo-controller')

const DAO = require('../dao/DAO')

const router = Router()
const dao = new DAO('todos', 'data.json')

router.get('/', (req, res) => {
    const todos = getAllTodos()
    
    res.render('todos', {
        title: 'Список дел',
        header: 'Список дел',
        content: 'Надо сделать эти дела: ',
        isTodos: true, 
        todos
    })
})

router.get('/:id', async (req, res) => {
    const todo = getTodoById(req.params.id)
    res.render('todo', todo)
})

router.get('/edit/:id', async (req, res) => {
    const todo = await dao.getTodoById(req.params.id)
    
    res.render('add', todo)
})

router.get('/delete/:id', async (req, res) => {
    await dao.deleteTodo(req.params.id)
    
    res.redirect('/todos')
})

module.exports = router