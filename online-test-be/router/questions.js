const router = require("express").Router();
var middleware = require('../middleware/middleware')
const winston = require('../config/winston')


class getData {

    constructor(getDataController) {
        this.controller = getDataController
        this.init();
    }

    init() {
        router.post("/userinfo", middleware, (req, res) => {
            //console.log('::req.user', req.user)
            const { id } = req.user
            const data =req.userData

            this.controller.userinfo(
                id
            )
                .then(result => {
                    winston.log({ 
                        message: {
                          user: data,
                          action: "getUserInfo",
                          controller: "questions",
                          function: "userinfo()",
                          msg:'User Found',
                          
                        }, 
                        level: 'info'
                    })   
                    res.send(result);
                });
        })



        //get all questions 
        router.get("/", middleware, (req, res) => {
            const { limit, page } = req.query
            //console.log(req.query)
            //console.log('hit for get all question', req.body)
            this.controller.getAllQuestions(limit, page)
                .then(result => {
                    winston.log({ message: 'Question data is transfered', level: 'info' })
                    res.send(result);
                });

        })

        //get a question
        router.get("/:status", middleware, (req, res) => {
            const { status } = req.params
            const userId = req.user.id
            //console.log('hit for get specific question / active question')
            this.controller.getQuestion(
                status, userId
            )
                .then(result => {
                    winston.log({ message: 'Question activated', level: 'info' })
                    res.send(result);
                });

        })


        //create new question
        router.post("/create", middleware, (req, res) => {
            //console.log("Incom")
            const { title, description, html, css, js } = req.body;
            this.controller.newQuestion(
                title,
                description,
                html,
                css,
                js
            ).then(result => {
                winston.log({ message: 'Question created', level: 'info' })
                res.status(200).send({
                    message: "Added a Question"
                });
            });
        });


        //update a question
        router.patch("/:id", middleware, (req, res) => {
            const { id } = req.params
            const { title, description, html, css, js } = req.body;
            this.controller.updateQuestion(id, title, description, html, css, js)
                .then(result => {

                    if (result.nModified == 0) {
                        winston.log({ message: 'no changes', level: 'info' })
                        res.status(403).send({
                            message: "no Changes"
                        });
                    }
                    else {
                        winston.log({ message: 'Question changes updated', level: 'info' })
                        res.status(200).send({
                            message: "Question updated"
                        });
                    }
                })
        })

        //update a question active
        router.get("/active/:id", middleware, (req, res) => {
            const { id } = req.params
            const data =req.userData

            this.controller.setActiveQuestion(id)
                .then(result => {
                    winston.log({ 
                        message: {
                          user: data,
                          action: "active question",
                          controller: "questions",
                          function: "setActiveQuestion()",
                          msg:'Question Activated',
                          
                        }, 
                        level: 'info'
                    })  
                    
                    res.send({
                        message: "Question is Active"
                    });
                })
        })

        //delete a question
        router.delete("/:id", middleware, (req, res) => {
            const { id } = req.params;
            this.controller.deleteQuestion(id)
                .then(result => {
                    winston.log({ message: 'Question deleted', level: 'info' })
                    res.status(200).send({
                        message: "Question deleted"
                    });
                })
        })

        // add userid to question table
        router.post('/adduserid', middleware, (req, res) => {
            const { id } = req.user
            const { questionId } = req.body
            const data =req.userData
            this.controller.addUserId(id, questionId)
                .then(result => {
                    winston.log({ message: 'User ID added', level: 'info' })
                    winston.log({ 
                        message: {
                          user: data,
                          action: "adduserid",
                          controller: "questions",
                          function: "addUserId()",
                          msg:'add userid to question table',
                          
                        }, 
                        level: 'info'
                    })  
                    res.send({
                        message: "userid added"
                    });

                })
        })
    }


    getRouter() {
        return router;
    }
}

module.exports = controller => {
    return new getData(controller);
};
