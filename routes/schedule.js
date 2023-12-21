const { Router } = require('express')
const router = new Router()

const {
    getAllDayShedules
} = require('../controller/shedule-controller')

router.get('/', async (req, res) => {
    res.render('shedule', {
        title: 'Расписание',
        header: 'Расписание',
        isShedule: true, 
        shedule: {}
    })
})

router.post('/', async (req, res) => {
    res.redirect('/shedule')
})

module.exports = router