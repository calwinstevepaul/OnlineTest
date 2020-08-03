import React, { Component } from 'react'
import './Navbar.css'
import logo from '../../img/logo.png'
import { withRouter } from 'react-router-dom'

export class Navbar extends Component {
    logout=async()=>{
       await this.props.removeOnlineUser()
       this.props.changeLoginState(false)
       sessionStorage.clear()
       this.props.history.push('/')


    }
    render() {
        const { currentUserInfo} = this.props
        return (
            <div className="Navbar">
                <div className="logo-container">
                    <img className="navlogo" src={logo} height="14px" width="130px" alt="logo"/>
                </div>
                <div className="navbar-inner">
                    <div> 
                        <p className="welcome-message">
                            hello, {currentUserInfo?currentUserInfo.name:'User'}
                        </p>                
                    </div>
                    <div>
                        <button onClick={this.logout} className="logout-btn">Logout</button>
                    </div>    
                </div>               
               
               
            </div>
        )
    }
}

export default withRouter (Navbar)
