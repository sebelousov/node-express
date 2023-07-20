const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: 'О компании',
        header: 'О компании',
        content: 'Описание компании',
        isAbout: true
    })
})

module.exports = router