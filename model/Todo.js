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
    }, 
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = model('Todo', todoSchema)