const { Router } = require('express')
const {
    getAllTodos,
    getTodoById,
    deleteTodoById
} = require('../controller/todo-controller')

const router = Router()

router.get('/', async (req, res) => {
    const todos = JSON.parse(await getAllTodos())
    
    res.render('todos', {
        title: 'Список дел',
        header: 'Список дел',
        content: 'Надо сделать эти дела: ',
        isTodos: true, 
        todos: todos
    })
})

router.get('/:id', async (req, res) => {
    const todo = JSON.parse(await getTodoById(req.params.id))
    
    res.render('todo', todo)
})

router.get('/edit/:id', async (req, res) => {
    const todo = JSON.parse(await getTodoById(req.params.id))
    
    res.render('add', todo)
})

router.get('/delete/:id', async (req, res) => {
    await deleteTodoById(req.params.id)
    
    res.redirect('/todos')
})

module.exports = router