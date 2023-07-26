const {
    saveTodo,
    updateTodoById
} = require('../controller/todo-controller')

const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить дело',
        header: 'Добавить дело',
        content: 'Пожалуйста, добавьте в форму дело: ',
        isAdd: true
    })
})

router.post('/', (req, res) => {
    const todo = {
        title: req.body.title, 
        desc: req.body.desc, 
        duration: req.body.duration
    }

    if (!req.body.id) {
        saveTodo(todo)
    } else {
        updateTodoById(req.body.id, todo)
    }
    
    res.redirect('/todos')
})

module.exports = router