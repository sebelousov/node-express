const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    nick: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                todoId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Todo',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.getCartTodos = function () {
    return [...this.cart.items]
}

userSchema.methods.addToCart = function (todo) {
    const items = [...this.cart.items]
    
    const index = items.findIndex(t => {
        return t.todoId.toString() === todo._id.toString()
    })
    
    if (index >= 0) {
        items[index].count++
    } else {
        items.push({
            count: 1, 
            todoId: todo._id
        })
    }
    
    this.cart = {items}
    this.save()

    return index !== -1 ? items[index].count : 1
}

userSchema.methods.removeTodoFromCart = function (todoId) {
    const items = [...this.cart.items]
    
    const index = items.findIndex(t => t.todoId.toString() === todoId)

    if (index !== -1) {
        items[index].count--
        if (items[index].count === 0) {
            items.splice(index, 1)
            this.cart = {items}
            this.save()
            return 0
        }
        this.cart = {items}
        this.save()
    }

    return items[index].count
}

userSchema.methods.isTodoInCart = function (todoId) {
    const items = [...this.cart.items]
    const index = items.findIndex(t => t.todoId.toString() === todoId)

    return index !== -1
}

module.exports = model('User', userSchema)