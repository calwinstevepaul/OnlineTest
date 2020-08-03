const router = require("express").Router();
var middleware = require('../middleware/middleware')
const winston = require('../config/winston')

class getData {

    constructor(getDataController) {
        this.controller = getDataController
        this.init();
    }

    init() {



        //get users
        router.get("/", middleware, (req, res) => {
            const { limit, page } = req.query
            // console.log('hit for get active users')
            this.controller.getActiveUsers(limit, page)
                .then(result => {
                    res.send(result);
                });
            winston.log({ message: 'Existing Users obtained', level: 'info' })
        })

        //get online users
        router.get("/onlineUsers", middleware, (req, res) => {
            // console.log('hit for get onlineUsers')
            const { page, limit } = req.query
            this.controller.onlineUsers(page, limit)
                .then(result => {
                    res.send(result);
                });
            winston.log({ message: 'Active Users', level: 'info' })
        })

        //search active users
        router.get("/search", middleware, (req, res) => {
           // console.log('hit for search active users')
            const { key } = req.query
            //console.log(key)
            this.controller.searchActiveUsers(key)
                .then(result => {
                    res.send(result);
                });
            winston.log({ message: 'Active Users found', level: 'info' })

        })

        //get  admin users
        router.get("/admin", middleware, (req, res) => {
            // console.log('::req.user',req.user)
            const { id } = req.user
            this.controller.getActiveAdminUsers(
                id
            )
                .then(result => {
                    res.send(result);
                });
            winston.log({ message: 'Active Admin Users obtained', level: 'info' })

        })



        //get attented questions
        router.post("/questions", middleware, (req, res) => {
            const { _id } = req.body
            this.controller.getAttendedQuestions(
                _id
            )
                .then(result => {
                    res.send(result);
                });
            winston.log({ message: 'Attended Question for the user', level: 'info' })

        })

        //get a user
        router.get("/:id", middleware, (req, res) => {
            const { id } = req.params
            this.controller.getUser(id)
                .then(result => {
                    res.send(result);
                });
            winston.log({ message: 'Getting User', level: 'info' })

        })

        // Adding current online user 
        router.post("/addOnlineUser", (req, res) => {
            const { id } = req.body
            this.controller.addOnlineUser(id)
                .then(result => {
                    if (result.nModified == 0) {
                        res.status(403).send({
                            message: "invalid user"
                        });
                        winston.log({ 
                            message: {
                              userId: id,
                              action: "user",
                              controller: "user",
                              function: "addOnlineUser()",
                              error:'Invalid User',
                              params:req.body       
                            }, 
                            level: 'warn'
                          })   
                    }
                    else {
                        winston.log({ 
                            message: {
                              userId: id,
                              action: "user",
                              controller: "user",
                              function: "addOnlineUser()",
                              msg:'Users Added'
                            }, 
                            level: 'info'
                          })   
                    
                        res.send({ message: "Current online user added" });
                        console.log("object")
                    }

                })
                .catch(e => {
                    winston.log({ 
                        message: {
                          userId: id,
                          action: "user",
                          controller: "user",
                          function: "addOnlineUser()",
                          error:'User Adding Exception',
                          params:req.body       
                        }, 
                        level: 'warn'
                      })
                    res.status(403).send({
                        message: e.message

                    })
                })
                
        })

        //get data for chart
        router.post("/chart", middleware, (req, res) => {
            this.controller.getChartdata()
                .then(result => {
                    winston.log({ message: 'Chart data obtained', level: 'info' })
                    res.send(result)
                })

        })


        // Removing current online user
        router.post("/removeOnlineUser", middleware, (req, res) => {
            const { id } = req.user
            const data =req.userData

            this.controller.removeOnlineUser(id)
                .then(result => {

                    if (result.nModified == 0) {
                        winston.log({ 
                            message: {
                              userId: data,
                              action: "user",
                              controller: "user",
                              function: "removeOnlineUser()",
                              error:'Active User data was Invalid',
                              params:req.body       
                            }, 
                            level: 'warn'
                          })   
                        res.status(403).send({
                            message: "invalid user"
                        });
                    }
                    else {
                        res.send({
                            message: "Current online user removed"
                        });
                        winston.log({ 
                            message: {
                              userId: data,
                              action: "user",
                              controller: "user",
                              function: "removeOnlineUser()",
                              msg:'Active Users Removed'
                            }, 
                            level: 'info'
                          })   
                    
                    }
                })


        })

        // Removing a online user from admin page
        router.post("/adminremoveOnlineUser", middleware, (req, res) => {
            const { id } = req.body
            this.controller.removeOnlineUser(id)
                .then(result => {
                    if (result.nModified == 0) {
                        res.status(403).send({
                            message: "invalid user"
                        });
                        winston.log({ message: ' Invalid Admin user', level: 'error' })

                    }
                    else {
                        res.send({
                            message: "online user removed from admin page"
                        });
                        winston.log({ message: 'Admin Users Removed', level: 'info' })
                    }
                })

        })

        // Removing all online user from admin page
        router.post("/removeAllOnlineUser", middleware, (req, res) => {
            this.controller.removeAllOnlineUser()
                .then(result => {
                    res.send({
                        message: "all online user removed from admin page"
                    });
                    winston.log({ message: 'online Users Removed', level: 'info' })
                })

        })


        // Getting the count of Online User 
        router.post("/onlineUsersCount", middleware, (req, res) => {
            this.controller.onlineUsersCount()
                .then(result => {
                    res.send(result)
                })
            winston.log({ message: 'Online Users count sent', level: 'info' })

        })


    }

    getRouter() {
        return router;
    }
}

module.exports = controller => {
    return new getData(controller);
};
