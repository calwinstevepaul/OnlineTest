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
        this.recaptchaInstance = React.createRef();
        this.state = {
            loginName:'',
            loginPassword:'',
            errormsg:'',
            isVerified: false,
            captcha:null
        }
    }
    resetRecaptcha = () => {
        this.recaptchaInstance.reset();  
        this.setState({
            isVerified:false
        })
    };    
    eventHandle=(e)=>{
        let value = e.target.value
        if (e.target.name === "loginName") {
            value = e.target.value.toLowerCase();
        }
        this.setState({
            [e.target.name]: value
        })
    }    

    submit=(e)=>{
        e.preventDefault();
        if(this.state.isVerified){
            plainApi.post("/auth/login",{
                loginName:this.state.loginName,
                loginPassword:this.state.loginPassword,
                response:this.state.captcha

            }).then(res => {
                console.log(res)
                if(res.data.message === "login successful") {
                    sessionStorage.setItem("token",JSON.stringify(
                        {
                            token:res.data.token,
                            tokenId:res.data.id
                        }))
                    this.props.addOnlineUser(res.data.id)
                    this.props.changeLoginState(true)
                    this.props.history.push('/home')
                }
            }).catch((e)=>{
                // console.log('error',e.response.data.message);
                this.resetRecaptcha()
                if(e.response){
                    this.setState({
                        err:'*'+e.response.data.message
                    })
                    setTimeout(()=>{this.setState({err:""})},1000)
                }
                else{
                    swal({icon:'error',text:"Network Error"})
                }  
            })
                        
        }
        else{
            this.resetRecaptcha()
            swal({icon:'warning',text:"Please verify that you are a human"})
        }



        
    }

    recaptchaLoaded=()=>{
        this.setState({
            isVerified:false,
            captcha:null
        })
    }
    verifyCallback=(res)=>{
        if (res){
            this.setState({
                isVerified:true,
                captcha:res

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
                        <h1 className='logo-img' >Login</h1>
                    </div>
                    <div className="login-signup-div-inner">
                       <form onSubmit={(e)=>this.submit(e)}>
                            {this.state.err
                                ?
                                    <p className='error'>{this.state.err}</p>
                                :
                                    <></>
                            }
                            <input 
                                type="email" 
                                className="login-signup-div-input" 
                                placeholder="Email" 
                                name="loginName" 
                                onChange={(e)=>this.eventHandle(e)} 
                                value={this.state.loginName} 
                                maxlength="40" 
                                minLength="3" 
                                required
                            />
                            <input 
                                type="password" 
                                className="login-signup-div-input" 
                                placeholder="Password" 
                                name="loginPassword" 
                                onChange={(e)=>this.eventHandle(e)} 
                                value={this.state.loginPassword} 
                                maxlength="40" 
                                minLength="3" 
                                required
                            />
                            <button 
                                type="submit" 
                                className="login-signup-div-button-2" 
                            >Log In</button>
                            <Recaptcha
                                ref={e => this.recaptchaInstance = e}
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
                    <button 
                        className="login-signup-div-button" 
                        onClick={()=>this.props.changeLoginSignup(false)}
                    >Signup</button>
                </div>
            </div>
        )
    }
}

export default withRouter (LoginDiv)  