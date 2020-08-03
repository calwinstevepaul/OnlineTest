const Users = require('../models/users')
const winston = require('../config/winston')


module.exports.changeUserLoginState = async (id) => {
    winston.log({ level: 'info', message: 'User Login state Changed' })
    return await Users.update({
        _id: id
    },
        {
            $set: {
                isOnline: false
            }
        }
    )
}
module.exports.getUserLoginState = async (id) => {
    winston.log({ level: 'info', message: 'Current State of User' })
    return await Users.find({
        _id: id
    }
    )
}