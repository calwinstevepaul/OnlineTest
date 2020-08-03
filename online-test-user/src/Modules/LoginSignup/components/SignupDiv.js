import React, { Component } from 'react'
import swal from 'sweetalert'
import '../LoginSignup.css'
import { plainApi } from '../../../apicall'
import logo from '../../../img/logo-black.png'
import Recaptcha from 'react-recaptcha'


export class SignupDiv extends Component {
    matchName = "^[A-z][A-z ]*[A-z]$";
    

    constructor(props) {
        super(props)
        this.recaptchaInstance=React.createRef();
        this.state = {
            signupName: '',
            organization: '',
            signupeMail: '',
            error: '',
            passwordErr: '',
            captcha:null,
            isVerified: false
        }
    }

    resetRecaptcha = () => {
        this.recaptchaInstance.reset();  
        this.setState({
            isVerified:false
        })
    };
    eventHandle = (e) => {
        let value = e.target.value
        if (e.target.name === "signupEmail") {
            value = e.target.value.toLowerCase();
        }
        this.setState({
            [e.target.name]: value
        })
    }

    submit = (e) => {
        e.preventDefault();       
        if(this.state.isVerified){    
            plainApi.post("/auth/signup", {
                signupName: this.state.signupName,
                organization: this.state.organization,
                signupEmail: this.state.signupEmail,
                response:this.state.captcha
            }).then((res) => {
                if (res.data.success) {
                    swal({ text: "Sign up Successful!!!", icon: "success" })
                    this.props.changeLoginSignup(true)
                }
                
            }).catch((e) => {
                this.resetRecaptcha()

                if(e.response){
                    swal({ text: e.response.data.message, icon: "error" })
                    this.setState({
                        signupName: '',
                        organization: '',
                        signupEmail: ''
                    })
                }
                else {
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
            <div>
                <div className="login-signup-div">
                    <div className='logo'>
                        <img src={logo} alt={"logo"} />
                    </div>
                    <div>
                        <h1 className='logo-img' >Sign up</h1>
                    </div>
                    <div className="login-signup-div-inner">
                        <form onSubmit={(e) => this.submit(e)}>
                            {this.state.error 
                                ? 
                                    <p className='error'>{this.state.error}</p> 
                                : 
                                    <></>
                                }
                            {this.state.passwordErr 
                                ? 
                                    <p className='error'>{this.state.passwordErr}</p> 
                                :   
                                    <></>
                            }

                            <input 
                                name="signupName" 
                                onChange={(e) => this.eventHandle(e)} 
                                className="login-signup-div-input" 
                                placeholder="Full Name" 
                                value={this.state.signupName} 
                                maxlength="40" 
                                minLength="3" 
                                pattern={this.matchName} 
                                required
                            />
                            <input 
                                type="email" 
                                name="signupEmail" 
                                onChange={(e) => this.eventHandle(e)} 
                                className="login-signup-div-input" 
                                placeholder="Email" 
                                value={this.state.signupEmail} 
                                maxlength="40" 
                                minLength="3" 
                                required
                            />
                            <input 
                                name="organization" 
                                onChange={(e) => this.eventHandle(e)} 
                                className="login-signup-div-input" 
                                placeholder="College/Institution" 
                                value={this.state.organization} 
                                maxlength="40" 
                                minLength="3"  
                                required
                            />
                            <button 
                                type="submit" 
                                className="login-signup-div-button-2" 
                            >Sign up</button>
                            <Recaptcha
                                ref={e => this.recaptchaInstance = e}
                                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                                render="explicit"
                                verifyCallback={this.verifyCallback}
                                onloadCallback={this.recaptchaLoaded}
                                expiredCallback={this.recaptchaLoaded}
                            />
                        </form>
                    </div>
                </div>
                <div className="login-signup-div-switch">
                    <p className="login-signup-div-para">Have an account?</p>
                    <button 
                        className="login-signup-div-button" 
                        onClick={() => this.props.changeLoginSignup(true)}
                    >Log In</button>
                </div>
            </div>
        )
    }
}

export default SignupDiv
