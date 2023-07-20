const { Router } = require('express')
const DAO = require('../dao/DAO')

const router = Router()
const dao = new DAO('todos', 'data.json')

router.get('/', async (req, res) => {
    const todos = JSON.parse(await dao.getAllTodos())
    
    res.render('todos', {
        title: 'Список дел',
        header: 'Список дел',
        content: 'Надо сделать эти дела: ',
        isTodos: true, 
        todos: todos
    })
})

router.get('/:id', async (req, res) => {
    const todo = await dao.getTodoById(req.params.id)
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