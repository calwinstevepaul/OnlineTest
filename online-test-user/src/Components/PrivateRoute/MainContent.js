import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from '../../Modules/Student/HomePage/Homepage'
import Navbar from '../../Components/NavBar/Navbar'
import {authApi} from '../../apicall'

export class    MainContent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             currentUserInfo:{},
             currentAdminPage:0
        }
    }
    componentDidMount(){
        this.currentUserInfo() 
        this.onWindowClose()
    }
    onWindowClose=()=>{
        window.onbeforeunload=(ev)=>{
            ev.preventDefault();
            this.logout();
        }

    }
    currentUserInfo=()=>{
        authApi.post("/questions/userinfo", {}).then((res)=>{
            
           this.setState({
                currentUserInfo:res.data[0]
            })
        })    
    }
    setCurrentAdminPage=(value)=>{
        this.setState({
            currentAdminPage:value
        })
    }
    logout=async()=>{
        await this.props.removeOnlineUser()
        this.props.changeLoginState(false)
        sessionStorage.clear()
        this.props.history.push('/')
 
 
     }
    
    render() {
        return (
            <div>
                <Router>
                    <Navbar currentUserInfo={this.state.currentUserInfo} {...this.props}/>
                    <Switch>
                        <Route path='/home'>
                            <Homepage userInfo={this.state.currentUserInfo} />
                        </Route>          
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default MainContent
