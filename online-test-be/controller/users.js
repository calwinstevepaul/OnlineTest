const Users = require('../models/users')
const Question = require('../models/questions')
const Changes = require('../models/changes')
const AdminUsers = require('../models/usersAdmin')
const winston = require('../config/winston');
var morgan = require('morgan')



class getDataController {

    async getActiveUsers(limit, page) {
        var d = new Date()
        d.setDate(d.getDate() - 7)
        var data = await Users.find({
            last_update: {
                $gte: d
            },

        }).skip(parseInt(limit * page)).limit(parseInt(limit))
        var dataLength = await Users.find().countDocuments()
        winston.log({ level: 'info', message: 'Active Users Data Transferred' })
        return ({
            data: data,
            dataLength: dataLength
        })

    }

    async searchActiveUsers(key) {
        var d = new Date()
        d.setDate(d.getDate() - 7)
        const users = await Users.find({ name: { $regex: new RegExp(key), $options: 'i' }, last_update: { $gte: d } });
        winston.log({ level: 'info', message: 'User Found' })
        return users;
    }

    async getActiveAdminUsers(id) {
        winston.log({ level: 'info', message: 'Active Admin:' + id })
        return await AdminUsers.find({
            _id: id
        })
    }

    async getAttendedQuestions(userId) {
        const res = await Changes.find({ userId }).distinct("questionId");
        winston.log({ level: 'info', message: 'Attended Question is passed' })
        return await this.getQuestionsFromArray(res)
    }

    // to get full_questions from questionId array
    getQuestionsFromArray = async (array) => {
        var questionArray = await Question.find({
            _id: { $in: array }
        })
        winston.log({ level: 'info', message: 'Question Posted' })
        return questionArray
    }

    async getUser(_id) {
        return await Users.find({ _id })
    }


    async addOnlineUser(_id) {
        winston.log({ level: 'info', message: 'User Logged in:' + _id })
        return await Users.updateOne(
            {
                _id
            },
            {
                $set: {
                    isOnline: true
                }
            }
        )
    }
    async removeOnlineUser(_id) {
        winston.log({ level: 'info', message: 'User Logged Out:' + _id })
        return await Users.updateOne(
            {
                _id
            },
            {
                $set: {
                    isOnline: false
                }
            }
        )
    }

    async removeAllOnlineUser() {
        winston.log({ level: 'info', message: 'All Users Logged out' })
        return await Users.updateMany(
            {

            },
            {
                $set: {
                    isOnline: false
                }
            }
        )
    }

    async onlineUsers(page, limit) {
        winston.log({ level: 'info', message: 'Active Users Listing' })
        return await Users.find({ isOnline: true }).skip(parseInt(limit * page)).limit(parseInt(limit))
    }


    async onlineUsersCount() {
        winston.log({ level: 'info', message: 'Active Users Count' })
        let count = await Users.find({ isOnline: true }).countDocuments()
        // console.log(count)
        return ({
            onlineUsersCount: count
        })
    }


    // get chart data
    getChartdata = async () => {
        var totalQuestion = await Question.find({}, { title: 1, users_id: 1, _id: 0 })
        var ChartArray = []
        totalQuestion.map((ele, ind) => {
            //    console.log(ele.users_id.length)
            let tempArray = ChartArray
            tempArray.push({
                x: ele.title,
                y: ele.users_id.length
            })
            ChartArray = tempArray
        })
        winston.log({ level: 'info', message: 'Chart Data Transfered' })
        //    console.log(ChartArray)
        return ChartArray
    }

}

module.exports = () => {
    return new getDataController();
}