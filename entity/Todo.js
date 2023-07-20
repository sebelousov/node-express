const { v4: uuidv4 } = require('uuid')

class Todo {
    constructor(id, todo, desc, duration) {
        this.id = id ? id : uuidv4()
        this.todo = todo
        this.desc = desc
        this.duration = duration
    }

    getTodo() {
        return this.todo
    }

    toJSON() {
        return {
            id: this.id,
            todo: this.todo, 
            desc: this.desc, 
            duration: this.duration
        }
    }
}

module.exports = Todo