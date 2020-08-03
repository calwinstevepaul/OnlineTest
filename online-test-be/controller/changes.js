const Changes = require('../models/changes')
const Users = require('../models/users')
const ObjectId = require('mongoose').Types.ObjectId
const winston = require('../config/winston');

class getDataController {

    //we dont need this 
    // async getAllChanges(){
    //     var d = new Date()
    //     // d.setMinutes(d.getMinutes()-30)
    //     d.setDate(d.getDate()-1)
    //     console.log(d)
    //     return await Changes.find({ 
    //         updated_at: { $gte:d },
    //         // userId:"asdasdasd",
    //         questionId:"String",
    //         _id:ObjectId("5e797a0b5ef4c02336c2b191")
    //     })
    // }

    //changes saving when user editing the code..   should be done with lambda
    async newChange(change) {
        winston.log({ level: 'info', message: 'New Changes Made' })
        return await Changes.create({
            userId: new ObjectId(change.userId),
            updated_at: new Date(),
            diff: change.diff,
            questionId: change.questionId,
            html: change.html,
            css: change.css,
            js: change.js,
        })

    }

    //get changes for admin
    async getUserChanges({ userId, questionId, limit, pageNumber }) {
        var changes = await Changes.find({
            questionId,
            userId
        }).skip(limit * pageNumber).limit(parseInt(limit)).sort({ updated_at: -1 })
        var changesLength = await Changes.find({
            questionId,
            userId
        }).countDocuments()
        winston.log({ level: 'info', message: 'Getting User Changes' })
        return ({ changes: changes, dataLength: changesLength })
    }


    search = async (code) => {
        const users_ids = await Changes.find({ $text: { $search: code } }).distinct("userId");
        const users = await this.getUsersFromArray(users_ids)
        winston.log({ level: 'info', message: 'Searching Users from code' })
        return users;
    }

    getUsersFromArray = async (array) => {
        winston.log({ level: 'info', message: 'Getting Users for changes made' })
        return await Users.find({
            _id: { $in: array }
        })
    }

    async searchCode(code) {
        // await Changes.createIndex( { html: "text" } )
        // console.log('in controller',code)
        const changes = await Changes.find({ $text: { $search: code } })
        const users = await this.search(code)
        winston.log({ level: 'info', message: 'Searching Code ' })
        return await this.getResult(changes, users)

    }

    getResult = async (changes, users) => {
        return await changes.map(change => {
            change['userId'] = users.find(user => user._id.equals(change.userId))
            winston.log({ level: 'info', message: 'Getting Result' })
            return change
        })
    }

}

module.exports = () => {
    return new getDataController();
}