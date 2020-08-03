const router = require("express").Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware")
const multer = require('multer')
const path = require('path')
const winston = require('../config/winston')
const recaptcha = require('../middleware/recaptcha')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

class auth {
  anyError= "something went wrong"
  matchName = /^[A-z][A-z ]*[A-z]$/

  constructor(authController) {
    this.controller = authController
    this.init();
  }
  passwordGenerator(len){
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const num = '0123456789'
    const rand = [upper, num]
      let password = ''
      for (let i=0; i<len; i++){
          const selected = rand[Math.floor(Math.random()*2)]
          password = password+ selected[Math.floor(Math.random()*selected.length)]
      }
      return password
 
  }

  init() {
    router.post("/signup",recaptcha,(req, res) => {
      
      const signupPassword = this.passwordGenerator(10);
      const { signupName, signupEmail, organization } = req.body;
      const email = signupEmail.toLowerCase()
      const maxLength = 30
      const minLength = 3

      if( 
        minLength >= signupName.length >= maxLength ||
        minLength >= signupEmail.length >= maxLength ||
        minLength >= organization.length >= maxLength ||
        !this.matchName.test(signupName)
        ){

        res.status(400).json({ message: "form validation error" });
      }
      else{

        this.controller.signup(
          email,
          signupName,
          organization,
          signupPassword
        ).then(result => {
          if(!result.status){
            res.status(400).json({ message: result.message })
          }

          winston.log({ 
            message: {
              user: email,
              action: "signup",
              controller: "auth",
              function: "signUp()"
            }, 
            status: result.status,
            level: 'info'
          })

          const msg = {
            to: result.data.email,
            from: process.env.SIGNUP_EMAIL_ID,
            subject: 'Codingmart test username and password',
            html: `
              <p>
                hello, ${result.data.name}<br><br>
                Greetings from Codingmart!<br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We are glad to inform you that you have successfully registered for attending codingmart interview!!!   
                  <br>
                Your username and password is mentioned below.               
              </p>
              <br>
              <table border='1'>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
                <tr>
                  <td>${result.data.email}</td>
                  <td>${signupPassword}</td>
                </tr>
              </table>
              <p>
                ALL THE BEST!!!.<br> 
                Looking forward to meet you! in Codingmart family...<br>
                <span>Thank You</span>
              </p>
              <p>
              Regards,            
              </p>
              <p>
              Global Campus Hiring Team
              <br>
              <b>Codingmart Limited</b>
              </p>` ,
  
          };
          sgMail.send(msg)
            .then(()=>{
              res.send({ success: result.status})
              winston.log({ 
                message: {
                  user: email,
                  action: "Email Generation sucessful",
                  function: "sgMail.send()"
                }, 
                status: result.status,
                level: 'info'
              })          
            })
            .catch(()=>{
              let errMsg = "Email Generation Error"
              res.status(400).json({ message: errMsg });   
              winston.log({ 
                message: {
                  user: email,
                  error: "Email Generation Error from sendgrid",                
                }, 
                level: 'info'
              })
            })
        }
        ).catch(err => {
          let errMsg;
          if (err.code == 11000 ){
            errMsg = "Email Id already exists"
          }
          else{
            errMsg = this.anyError
          }
          winston.log({ 
            message: {
              user: email,
              action: "signup",
              controller: "auth",
              function: "signUp()",
              error:errMsg
            }, 
            level: 'info'
          })          
          res.status(400).json({ message: errMsg });
          
        })
      }

    });






    router.post('/login',recaptcha,(req, res) => {
      const { loginName, loginPassword } = req.body;
      let maxLength =30
      let minLength =3

      if( 
        minLength >= loginName.length >= maxLength || 
        minLength >= loginPassword.length >= maxLength
        ){
        res.status(400).json({ message: "form validation error" });
        winston.log({ 
          message: {
            user: loginName,
            action: "login",
            controller: "auth",
            function: "login()",
            error:'form validation error',
            params:{
              loginName:loginName,
              loginPassword:"*********",
              response:req.body.response
            }
          }, 
          level: 'info'
        })          
      }
      else{
        this.controller.login(
          loginName,
          loginPassword
        ).then(result => {
  
          if (result.length == 0) {
            res.status(400).send({ message: "invalid user" });
            winston.log({ 
              message: {
                user: loginName,
                action: "login",
                controller: "auth",
                function: "login()",
                error:'Invalid user',
                params:{
                  loginName:loginName,
                  loginPassword:"*********",
                  response:req.body.response
                }              }, 
              level: 'warn'
            })   
            
          } 
          else {
            var passwordDB = result[0].password;
            bcrypt.compare(loginPassword, passwordDB, function (err, re) {
              if (re == true) {
                if (result[0].isOnline == false) {
                  var token = jwt.sign(
                    { id: result[0]._id },
                    process.env.BCRYPT_KEY,
                    { expiresIn: "3h" }
                  );
  
                  res.status(200).send({
                    name: result[0].name,
                    id: result[0].id,
                    token: token,
                    message: "login successful"
                  });
  
                  winston.log({ 
                    message: {
                      user: loginName,
                      action: "login",
                      controller: "auth",
                      function: "login()",
                      msg:'User Logged In successfully'                      
                    }, 
                    level: 'info'
                  })
                  
                }
                else {
                  res.status(400).send({ message: "This Email has been logged in already" });
                  winston.log({ 
                    message: {
                      user: loginName,
                      action: "login",
                      controller: "auth",
                      function: "login()",
                      error:'This Email has been logged in already',
                      params:{
                        loginName:loginName,
                        loginPassword:"*********",
                        response:req.body.response
                      }                    }, 
                    level: 'warn'
                  })   
                }
              }
              else {
                res.status(400).send({ message: "Wrong Password" })
                winston.log({ 
                  message: {
                    user: loginName,
                    action: "login",
                    controller: "auth",
                    function: "login()",
                    error:'Wrong Password',
                    params:{
                      loginName:loginName,
                      loginPassword:"*********",
                      response:req.body.response
                    }                  }, 
                  level: 'warn'
                }) 
              }
            });
          }
        })

      }
 
    })


    // admin signup and login

    router.post("/signupadmin", (req, res) => {
      let signupPassword = '123'
      const { signupName, signupEmail } = req.body;
      const email = signupEmail.toLowerCase()
      const maxLength = 30
      const minLength = 3
     
      if( 
        minLength >= signupName.length >= maxLength ||
        minLength >= signupEmail.length >= maxLength ||        
        !this.matchName.test(signupName)
        ){
        res.status(400).json({ message: "form validation error" });
      }
      else{
        this.controller.signupAdmin(
          email,
          signupName,
          signupPassword
        ).then(result => {
          const msg = {
            to: result.data.email,
            from: process.env.SIGNUP_EMAIL_ID,
            subject: 'Codingmart test username and password',
            html: `
              <p>
                hello, ${result.data.name}<br><br>
               
                Your username and password is mentioned below.               
              </p>
              <br>
              <table border='1'>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
                <tr>
                  <td>${result.data.email}</td>
                  <td>${signupPassword}</td>
                </tr>
              </table>
              
              <p>
              HR Team
              <br>
              <b>Codingmart Limited</b>
              </p>` ,
    
          };
          sgMail.send(msg);
          res.send({ success: result.status, error: result.message })
          winston.log({ message: 'E-mail sent successfully', level: 'info' })
        }
        ).catch(err => {
          winston.log({ message: 'E-mail already exist', level: 'warn' })
          res.status(400).json({ message: "E-mail already exist" });
        })

      } 
    });


    //update profile pic
    router.post("/admin/profilepic", middleware, upload.single("Profilepic"), (req, res) => {
      let str = req.file.path
      // REMOVING PUBLIC FROM THE PATH AS IT IS STATIC
      let newstr = str.slice(7)
      var url ="http://localhost:9000/"+newstr
      const { id } = req.user
      console.log(url)
      this.controller.updateProfilePicture(url, id)
        .then(result => {
          winston.log({ message: 'Updated Profile picture', level: 'info' })
          res.send(result)
        })
        .catch(error => {
          winston.log({ message: 'unable to update profile picture', level: 'debug' })
          res.send(error)
        })
    })



    router.post('/loginadmin', (req, res) => {
      const { loginName, loginPassword } = req.body;
      const maxLength = 30
      const minLength = 3
      if( 
        minLength >= loginName.length >= maxLength || 
        minLength >= loginPassword.length >= maxLength
        ){
        res.status(400).json({ message: "form validation error" });
        winston.log({ 
          message: {
            user: loginName,
            action: "loginADMIN",
            controller: "auth",
            function: "loginAdmin()",
            error:'form validation error',
            params:{
              loginName:loginName,
              loginPassword:"*********",
              response:req.body.response
            }          }, 
          level: 'warn'
        })   
      }
      else{
        this.controller.loginAdmin(
          loginName,
          loginPassword
        ).then(result => {
          if (result.length == 0) {
            res.status(400).send({ message: "invalid user" });
            winston.log({ 
              message: {
                user: loginName,
                action: "loginADMIN",
                controller: "auth",
                function: "loginAdmin()",
                error:'Invalid User',
                params:{
                  loginName:loginName,
                  loginPassword:"*********",
                  response:req.body.response
                }              }, 
              level: 'warn'
            })   
            
            
          } else {
            var passwordDB = result[0].password;
            bcrypt.compare(loginPassword, passwordDB, function (err, re) {
              if (re == true) {
                var token = jwt.sign(
                  { id: result[0]._id },
                  process.env.BCRYPT_KEY,
                  { expiresIn: "3h" }
                );
  
                res.status(200).send({
                  name: result[0].name,
                  id: result[0].id,
                  token: token,
                  message: "login successful"
                });
                winston.log({ 
                  message: {
                    user: loginName,
                    action: "loginADMIN",
                    controller: "auth",
                    function: "loginAdmin()",
                    msg:'Login Successful'
                  }, 
                  level: 'info'
                })   
                
  
              } else {
                res.status(400).send({ message: "wrong password" });
                winston.log({ 
                  message: {
                    user: loginName,
                    action: "loginADMIN",
                    controller: "auth",
                    function: "loginAdmin()",
                    error:'wrong password',
                    params:{
                      loginName:loginName,
                      loginPassword:"*********",
                      response:req.body.response
                    }                  
                  }, 
                  level: 'warn'
                })   
              }
            });
          }
        })

      }

    })



  }

  getRouter() {
    return router;
  }
}

module.exports = controller => {
  return new auth(controller);
};
