const bcrypt = require('bcrypt')
const Users = require('../models/users')
const AdminUsers = require('../models/usersAdmin')
const { validateEmail } = require("../middleware/validators")
const winston = require('../config/winston');


class authController {

    async signup(signupemail, signupname, organization, signuppassword) {
        const emailErr = validateEmail(signupemail)
        if (!emailErr.isValid) {
            winston.log({ level: 'warn', message: 'E-mail is not valid' })
            return {
                status: false,
                message: emailErr.err
            }
        }
        let hash = await bcrypt.hashSync(signuppassword, 10);
        let res = await Users.create({
            name: signupname,
            email: signupemail,
            organization: organization,
            password: hash
        })
        if (res) {
            winston.log({ level: 'info', message: 'Candidate User Created Successfully' })
            return { status: true, data: res }
        }

    }

    async login(loginname, loginpassword) {
        winston.log({ level: 'info', message: 'Checking Candidate Users' })
        return await Users.find({
            email: loginname
        })
    }




    // admin signup and login

    async signupAdmin(signupemail, signupname, signuppassword) {
        const emailErr = validateEmail(signupemail)
        if (!emailErr.isValid) {
            winston.log({ level: 'warn', message: 'E-mail is not valid' })
            return new Error({ message: emailErr.err })
        }
        let hash = await bcrypt.hashSync(signuppassword, 10);
        let res = await AdminUsers.create({
            name: signupname,
            email: signupemail,
            password: hash,
            profilePicture: 'http://localhost:9000/uploads/IMAGE-1587204345758.png '
        })
        if (res) {
            winston.log({ level: 'info', message: 'Admin User Created Successfully' })
            return { status: true, data: res }
        }

    }
    async loginAdmin(loginName, loginPassword) {
        winston.log({ level: 'info', message: 'Checking Admin Users' })
        return await AdminUsers.find({
            email: loginName
        })
    }

    //update profile picture
    async updateProfilePicture(url, userId) {
        //    console.log(url,userId)
        const UpdateProfile = await AdminUsers.updateMany({
            _id: userId
        }, {
            profilePicture: url
        })
        winston.log({ level: 'info', message: 'Updating Profile Picture' })
        return url
    }

}


module.exports = () => {
    return new authController();
};
