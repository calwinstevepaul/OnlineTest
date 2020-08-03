import React, { Component } from 'react'
import swal from 'sweetalert';
import '../LoginSignup.css'
import {plainApi} from '../../../apicall'
import logo from '../../../img/logo-black.png'
import Recaptcha from 'react-recaptcha'


export class SignupDiv extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             signupName:'',
             signupEmail:'',
             error:'',
             passwordErr:'',
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
            if(this.state.signupName !== ""  && this.state.signupEmail !==""){
    
                plainApi.post("/auth/signupadmin",{
                    signupName:this.state.signupName,
                    signupEmail:this.state.signupEmail
                }).then((res)=>{
                    if(res.data.success){
                        swal({text : "Sign up Successful!!!", icon: "success"})
                        this.props.changeLoginSignup(true)
                    }
                }).catch((e)=>{
                    if(e.response){
                        swal({text : e.response.data.message, icon: "error"})
                            this.setState({
                                signupName:'',
                                signupEmail:''
                            })
                    }
                    else
                    {
                        swal({text: "Network Error",icon:"success"})
                    }
                })
    
            }
            else if(this.state.signupName === "" || this.state.signupEmail === ""){
                this.setState({error:"*Please fill all the fields"})
                setTimeout(() => {
                    this.setState({
                        error:''
                    })
                }, 3000);
            }       

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
            <div>
                <div className="login-signup-div">
                    <div  className='logo'>
                        <img src={logo} alt={"logo"} />
                    </div>
                    <div>
                        <h3 className='logo-img' >Sign up Admin Module</h3>
                    </div>
                    <div className="login-signup-div-inner">
                        <form onSubmit={(e)=>this.submit(e)}>
                            {this.state.error?<p className='error'>{this.state.error}</p>:<></>}
                            {this.state.passwordErr?<p className='error'>{this.state.passwordErr}</p>:<></>}                            

                            <input name="signupName" onChange={(e)=>this.eventHandle(e)} className="login-signup-div-input" placeholder="Full Name" value={this.state.signupName}/>
                            <input type="email" name="signupEmail" onChange={(e)=>this.eventHandle(e)} className="login-signup-div-input" placeholder="Email" value={this.state.signupEmail}/>
                            <button type="submit" className="login-signup-div-button-2" >Sign up</button>
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
                    <p className="login-signup-div-para">Have an account?</p>
                    <button className="login-signup-div-button" onClick={()=>this.props.changeLoginSignup(true)}>Log In</button>
                </div>
            </div>
        )
    }
}

export default SignupDiv
