const { Schema, model } = require('mongoose')

const daySheduleSchema = new Schema({
    todos: [
        {
            count: {
                type: Number,
                required: true
            },
            todoId: {
                type: Schema.Types.ObjectId,
                ref: 'Todo',
                required: true
            }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Day', daySheduleSchema)