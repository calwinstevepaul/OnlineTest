import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../LoginSignup.css'
import {plainApi} from '../../../apicall'
import logo from '../../../img/logo-black.png'
import swal from 'sweetalert'
import Recaptcha from 'react-recaptcha'



export class LoginDiv extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginName:'',
            loginPassword:'',
            isVerified: false

        }
    }
    
    eventHandle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }    

    submit=(e)=>{
        e.preventDefault();
        if(this.state.isVerified){
            plainApi.post("/auth/loginadmin",{
                loginName:this.state.loginName,
                loginPassword:this.state.loginPassword
            }).then(res => {
                if(res.data.message === "login successful") {
                    localStorage.setItem("token",JSON.stringify(
                        {
                            token:res.data.token,
                            tokenId:'admin'
                        }))
                    this.props.changeLoginState(true)
                    this.props.history.push('/home')
                }
            }).catch((e)=>{
                if(e.response)
                this.setState({
                    err:'*'+e.response.data.message
                })
                else
                swal({icon:"error",text:"Network Error"})
            })

        }
        else{
            swal({icon:'warning',text:"Please verify that you are a human"})
        }
        
    }

    recaptchaLoaded=()=>{
        this.setState({
            isVerified:false
        })
    }
    verifyCallback=(res)=>{
        if (res){
            this.setState({
                isVerified:true
            })
        }
    }


    render() {

        return (
            <div >
                <div className="login-signup-div">
                    <div  className='logo'>
                        <img src={logo} alt={"logo"} />
                    </div>
                    <div>
                        <h1 className='logo-img' >Login Admin Module</h1>
                    </div>
                    <div className="login-signup-div-inner">
                       <form onSubmit={(e)=>this.submit(e)}>
                            {this.state.err?<p className='error'>{this.state.err}</p>:<></>}
                            <input type="email" className="login-signup-div-input" placeholder="Email" name="loginName" value={this.state.loginName} onChange={(e)=>this.eventHandle(e)}/>
                            <input type="password" className="login-signup-div-input" placeholder="Password" name="loginPassword" value={this.state.loginPassword} onChange={(e)=>this.eventHandle(e)}/>
                            <button type="submit" className="login-signup-div-button-2" >Log In</button>
                            <Recaptcha
                                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                                render="explicit"
                                verifyCallback={this.verifyCallback}
                                onloadCallback={this.recaptchaLoaded}
                            />
                       </form>
                    </div>                   

                   
                </div>
                <div className="login-signup-div-switch">
                    <p className="login-signup-div-para">Don't have an account? </p>
                    <button className="login-signup-div-button" onClick={()=>this.props.changeLoginSignup(false)}>Signup</button>
                </div>
            </div>
        )
    }
}

export default withRouter (LoginDiv)  