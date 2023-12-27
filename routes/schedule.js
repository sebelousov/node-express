const { Router } = require('express')
const router = new Router()

const {
    getAllDayShedules,
    saveAllShedulesFromCart
} = require('../controller/shedule-controller')

router.get('/', async (req, res) => {
    try {
        const shedules = await getAllDayShedules(req.user._id)
        res.render('shedule', {
            title: 'Расписание',
            header: 'Расписание',
            isShedule: true, 
            shedules
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        await saveAllShedulesFromCart(req.user._id)
        res.redirect('/shedule')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router