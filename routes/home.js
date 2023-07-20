const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Главная страница',
        header: 'Заголовок главной страницы',
        content: 'Содержание главной страницы',
        isHome: true
    })
})

module.exports = router