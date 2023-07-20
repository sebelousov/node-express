const Todo = require('../entity/Todo')
const DAO = require('../dao/DAO')
const { Router } = require('express')

const router = Router()
const dao = new DAO('add', 'data.json')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить дело',
        header: 'Добавить дело',
        content: 'Пожалуйста, добавьте в форму дело: ',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const todo = new Todo(
            req.body.id, 
            req.body.todo, 
            req.body.desc, 
            req.body.duration
        ).toJSON()

    if (!req.body.id) {
        await dao.saveTodo(todo)
    } else {
        await dao.updateTodo(todo)
    }
    
    res.redirect('/todos')
})

module.exports = router