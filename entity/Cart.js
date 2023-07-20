class Cart {
    constructor() {
        
    }

    getCartTodos() {
        return {
            todos: this.cartTodos, 
            totalQuantity: this.totalQuantity,
            totalDuration: this.totalDuration
        }
    }

    getTotalQuantity() {
        return this.totalQuantity
    }

    getTodos() {
        return this.cartTodos
    }

    getQuantityOfTodoFromCart(todo) {
        const index = this.cartTodos.findIndex(t => t.todo.id === todo.id)
        
        if (index === -1) {
            return {
                quantity: 0
            }
        }

        return {
            quantity: this.cartTodos[index].quantity
        }
    }

    setCartTodos(cart) {
        this.cartTodos = cart ? cart.todos : []
        this.totalQuantity = cart ? cart.totalQuantity : 0
        this.totalDuration = cart ? cart.totalDuration : 0
    }

    addTodo(todo) {
        const index = this.cartTodos.findIndex(t => t.todo.id === todo.id)
        if (index !== -1) {
            this.cartTodos[index].quantity += 1
            this.cartTodos[index].duration += todo.duration * 1
        } else {
            this.cartTodos.push({
                index: this.cartTodos.length + 1,
                todo: todo,
                quantity: 1,
                duration: todo.duration * 1
            })
        }

        this.totalQuantity++
        this.totalDuration += todo.duration * 1
    }

    deleteTodo(todo) {
        const index = this.cartTodos.findIndex((t) => t.todo.id === todo.id)
        if (index !== -1) {
            this.cartTodos[index].quantity -= 1
            this.cartTodos[index].duration -= todo.duration * 1
            this.totalQuantity--
            this.totalDuration -= todo.duration * 1

            if (this.cartTodos[index].quantity === 0) {
                this.cartTodos.splice(index, 1)
            }
        }
    }
}

module.exports = Cart