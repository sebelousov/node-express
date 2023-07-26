const { Schema, model } = require('mongoose')

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

module.exports = model('Todo', todoSchema)