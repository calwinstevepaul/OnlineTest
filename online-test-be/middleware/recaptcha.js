const request = require('request')

const request_promise = (url, form)=>{
    return new Promise((resolve, reject)=>{
        request.post({
            url,
            form
        },(err, res, body)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(body)
            }
        })
    })
}

module.exports = (req, res, next) =>{

    const url = "https://www.google.com/recaptcha/api/siteverify"
    const secret = "6LeIIPkUAAAAABRoLvmKoBi3lFkpvZAIvoS57CMe"
    const response = req.body.response
    const form = {
       secret:secret,
       response:response
    }
    request_promise(url, form).then(result=>{
        result = JSON.parse(result)
        if(result.success){
            next()

        }
        else{

            return res.status(400).json({ message:"Invalid Captcha"})
        }
    }) 
}

