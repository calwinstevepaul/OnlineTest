const router = require("express").Router();
var middleware = require('../middleware/middleware')
var winston = require('../config/winston')


class getData {

    constructor(getDataController) {
        this.controller = getDataController
        this.init();
    }

    init() {
      
        // get change by a user for a specific question
        router.get("/:userId/:questionId/:limit/:pageNumber", middleware, (req, res) => {
            const { userId, questionId, limit, pageNumber } = req.params;
            this.controller.getUserChanges({ userId, questionId, limit, pageNumber })
                .then(result => {
                    winston.log({ message: 'User Change made', level: 'info' })
                    res.send(result);
                });
        });

        //create new change
        router.post("/", middleware, (req, res) => {
            // const { title, description, html, css, js } = req.body;
            const data =req.userData

            this.controller.newChange(req.body)
                .then(result => {
                    winston.log({ 
                        message: {
                          user: data,
                          action: "change",
                          controller: "change",
                          function: "nawchange()",
                          msg:'has done a change',
                        }, 
                        level: 'info'
                      })   
                    res.send(result)
                })
                .catch(err => {
                    winston.log({ 
                        message: {
                          user: data,
                          action: "change",
                          controller: "change",
                          function: "newChange()",
                          error:'unable to log in',
                          params:req.body       
                        }, 
                        level: 'warn'
                      })   
                });
        });

        router.post("/search", middleware, (req, res) => {
            const { code } = req.body;
            this.controller.searchCode(code).then(data => {
                winston.log({ message: 'user search using code done', level: 'info' })
                res.send(data)
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
 