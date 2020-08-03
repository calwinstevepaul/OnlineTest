const Users = require('../models/users')
const Question = require('../models/questions')
const Changes = require('../models/changes')
const winston = require('../config/winston');


class getDataController {

    async userinfo(id) {
        winston.log({ level: 'info', message: 'User Info' })
        return await Users.find({
            _id: id
        })

    }

    async getAllQuestions(limit, page) {
        let res = await Question.find().skip(parseInt(limit * page)).limit(parseInt(limit))
        let datacount = (await Question.find().countDocuments())
        winston.log({ level: 'info', message: 'All Question data with count' })
        return ({ data: res, count: datacount })


    }

    //-------questions.active means get active question,  else get question by id
    async getQuestion(status, _id) {
        const questionDescription = await Question.find(
            { active: true }, { description: 1 }
        )
        const existingUser = await Changes.find({
            userId: _id, questionId: questionDescription[0]._id
        })
        if (existingUser.length > 0) {
            return this.getQuestionWithPreviousChanges(existingUser, questionDescription);
        }
        else {
            return this.getOnlyActiveQuestion(status, _id);
        }

    }

    //getonlyactivequestions if user is new
    async getOnlyActiveQuestion(status, _id) {
        winston.log({ level: 'info', message: 'Active Question Listing' })
        if (status) {
            const activequestion = await Question.find({
                active: true
            })
            const addUserId = await Question.updateOne({
                active: true
            }, {
                $push: { userId: _id }
            })
            return { question: activequestion, alreadyUser: false }
        }
        else {
            const activequestion = await Question.find({
                status
            })
            return { question: activequestion, alreadyUser: false }
        }
    }

    // get code that user already typed
    async getQuestionWithPreviousChanges(data, description) {
        winston.log({ level: 'info', message: 'getting users existing code' });
        const res = data[data.length - 1]
        return { question: res, alreadyUser: true, questionDescription: description[0].description }
    }


    async updateQuestion(_id, title, description, html, css, js, active = false) {
        winston.log({ level: 'info', message: 'Updating Question' })
        let res = await Question.updateMany({
            _id
        },
            {
                title, description, html, css, js, active
            })
        return res

    }

    async deleteQuestion(_id) {
        let res = await Question.deleteMany({
            _id
        })
        winston.log({ level: 'info', message: 'Question Deleted' })
        return res

    }

    async newQuestion(title, description, html, css, js, active = false) {
        // console.log(title,description,html,css,js)  
        let res = await Question.create({
            title,
            description,
            html,
            css,
            js,
            active
        })
        winston.log({ level: 'info', message: 'New Question Added' })
        return res

    }

    //set active question
    async setActiveQuestion(_id) {
        let res = await Question.updateMany({
            _id
        },
            {
                active: true
            })
        let res2 = await Question.updateMany({
            _id: { $ne: _id }
        },
            {
                active: false
            })
        winston.log({ level: 'info', message: 'Question Status Changed to Active' })
        return res

    }

    addUserId = async (id, questionId) => {
        const UpdateuserId = await Question.update({ _id: questionId }, { $addToSet: { users_id: id } });  // winston.log({ level: 'info', message: ' User ID Added to the Question' })
        return UpdateuserId
    }
}

module.exports = () => {
    return new getDataController();
}