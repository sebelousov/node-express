const DayShedule = require('../model/DayShedule')
const User = require('../model/User')

const getAllDayShedules = async (userId) => {
    return ''
}

const saveAllShedulesFromCart = async (userId) => {
    try {
        const user = await User
            .findById(userId)
            .populate({
                path: 'cart.items.todoId'
            })
        
        const dayShedule = new DayShedule({
            todos: user.cart.items,
            userId
        })
        dayShedule.save()
        user.clearCart()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllDayShedules,
    saveAllShedulesFromCart
}