const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`)
})

// const express = require('express')
// const { engine } = require('express-handlebars')
// const app = express()
// const PORT = process.env.PORT || 3000

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// app.get('/', (req, res) => {
//     // res.send('Hello, World!')
//     res.render('home');
// })

// app.listen(PORT, () => {
//     console.log(`App listening to port ${PORT}`)
// })

// const express = require('express')

// const app = express()
// const PORT = process.env.PORT || 3000

// const handlebars = require('express-handlebars')

// app.set('view engine', 'handlebars')

// app.engine('handlebars', handlebars({
//     layoutsDir: __dirname + '/views/layouts'
// }))

// app.use(express.static('public'))
// app.get('/', (req, res) => {
//     res.render('main', {
//         layout: 'index'
//     })
// })

// app.listen(PORT, () => {
//     console.log(`App listening to port ${PORT}`)
// })

// const path = require('path')
// const express = require('express')
// const exphbs = require('express-handlebars')
// const PORT = process.env.PORT || 3000

// const app = express()

// const hbs = exphbs.create({
//     defaultLayout: 'main',
// 	extname: 'hbs'
// })

// app.engine('hbs', hbs.engine)
// app.set('view engine', 'hbs')
// app.set('views', 'views')



// Use static html-pages
// app.get('/', (req, res) => {
//     res.status(200)
//     res.sendFile(path.join(__dirname, 'views', 'index.html'))
// })

// app.get('/about', (req, res) => {
//     res.status(200)
//     res.sendFile(path.join(__dirname, 'views', 'about.html'))
// })

// app.get('/404', (req, res) => {
//     res.status(200)
//     res.sendFile(path.join(__dirname, 'views', '404.html'))
// })

// app.listen(PORT, () => {
//     console.log(`Server is running from port ${PORT}.`)
// })