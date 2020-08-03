import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './LoginSignup.css'

import LoginDiv from './components/LoginDiv'
import SignupDiv from './components/SignupDiv'

export class LoginSignup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginSignup:true
        }
    }
    componentDidMount(){
        if(this.props.currentLoginState){
            this.props.history.push('/home')
        }
        else{
            this.props.history.push('/')
        }
    }
    changeLoginSignup=(value)=>{
        this.setState({
            loginSignup:value
        })
    }
    
    render() {
        
        return (
            <div className="login-signup">
                {this.state.loginSignup?<LoginDiv  changeLoginSignup={this.changeLoginSignup} {...this.props}/>:<SignupDiv changeLoginSignup={this.changeLoginSignup}/>}
            </div>
        )
    }
}

export default withRouter (LoginSignup)
