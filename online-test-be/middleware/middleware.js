var jwt = require("jsonwebtoken");
var userModel = require('./changeUserLoginState')
const winston = require('../config/winston');
// winston.log({ level: 'warn', message: 'Token Error' })

module.exports = (req, res, next) => {
    var token = (req.headers.token)
    var userId = (req.headers.userid)
    jwt.verify(token, "calwin123", async (err, decode) => {
        if (err) {
            winston.log({ level: 'error', message: 'Token Error' })
            if (userId !== 'admin')
                userModel.changeUserLoginState(userId)
                    .then(() => {
                        winston.log({ level: 'warn', message: 'Invalid User Token' })
                        res.status(403).send({
                            message: "Invalid token"
                        })
                    })
                    .catch(e => {
                        winston.log({ level: 'warn', message: 'Invalid ID User' })
                        res.status(403).send({
                            message: "Invalid ID"
                        });
                    })

            else {
                winston.log({ level: 'warn', message: 'Invalid User Token ' })
                res.status(403).send({
                    message: "Invalid token"
                });
            }

        }
        else {

            if (userId === 'admin') {
                req.user = decode
                next()
            }
            else if (userId !== 'admin' && decode.id === userId) {

                let op = await userModel.getUserLoginState(decode.id).catch(e => {
                    winston.log({ level: 'warn', message: 'Invalid ID Admin' })
                    res.status(403).send({
                        message: "Invalid Id"
                    });
                })
                if (op[0].isOnline) {
                    req.user = decode
                    req.userData = op[0].email
                    next()
                }
                else {
                    winston.log({ level: 'warn', message: 'Invalid Admin Token ' })
                    res.status(403).send({
                        message: "Invalid token"
                    });
                }
            }
            else {
                winston.log({ level: 'error', message: 'Invalid ID ' })
                res.status(403).send({
                    message: "Invalid ID"
                });
            }

        }
    })
}