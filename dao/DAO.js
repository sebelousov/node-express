const fs = require('fs')
const path = require('path')

class DAO {
    constructor(id, fileName) {
        this.cartFileName = 'cart.json'
        this.todosFileName = 'data.json'
    }

    async deleteTodo(id) {
        const todos = JSON.parse(await this.getAllTodos())
        const index = todos.findIndex((todo) => todo.id === id)

        todos.splice(index, 1)

        await this.saveFile(this.todosFileName, todos)
    }

    async getAllTodos() {
        return await this.readFile(this.todosFileName)
    }

    async getTodoById(id) {
        const todos = JSON.parse(await this.getAllTodos())
        
        return todos.find((todo) => todo.id === id)
    }

    async saveTodo(todo) {
        const todos = JSON.parse(await this.getAllTodos())
        todos.push(todo)
        
        await this.saveFile(this.todosFileName, todos)
    }

    async updateTodo(todo) {
        const todos = JSON.parse(await this.getAllTodos())
        const index = todos.findIndex((item) => item.id === todo.id)

        todos[index] = todo

        await this.saveFile(this.todosFileName, todos)
    }

    async readCart() {
        const json = await this.readFile(this.cartFileName)

        try {
            return JSON.parse(json)
        } catch (error) {
            return undefined
        }
    }

    async saveCart(todos) {
        await this.saveFile(this.cartFileName, todos)
    }

    async readFile(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../', fileName),
                'utf8',
                (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                }
            )
        })
    }

    async saveFile(fileName, todos) {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '../', fileName),
                JSON.stringify(todos),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    
}

module.exports = DAO