const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    desc: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo