const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000
const URL = 'mongodb://localhost:27017/Todos'

const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const todosRoutes = require('./routes/todos')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

app.use('/', homeRoutes)
app.use('/about', aboutRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)
app.use('/todos', todosRoutes)

start()

async function start() {
    try {
        await mongoose.connect(URL)
        app.listen(PORT, () => {
            console.log(`App listening to port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

