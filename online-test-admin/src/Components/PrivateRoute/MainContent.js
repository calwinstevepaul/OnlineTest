import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {authApi} from '../../apicall'
import Admin from '../../Modules/Admin/Admin';
import AdminNavbar from '../../Modules/Admin/admin-nav/rightnav'
import swal from 'sweetalert';



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
    }
    currentUserInfo=()=>{
        authApi.get("/users/admin", {}).then(res=>{
           
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
    setProfilePicture=(value)=>{
      
        const formdata=new FormData()
        formdata.append("Profilepic",value)
        let config={
            headers: {
                'content-type': 'multipart/form-data',
            }
        }
        authApi.post('/auth/admin/profilepic',formdata,config)
        .then((res)=>{
            swal({
                icon:'success',
                text:'Profile Picture has been uploaded successfully'
            })
            this.currentUserInfo();
        })
        .catch((err)=>{
            console.log("err",err)
        })
    }
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path='/home'>  
                        <div className="admin-main-screen">
                            <AdminNavbar 
                                currentPageState={this.state.currentAdminPage}
                                currentPage={this.setCurrentAdminPage}
                                currentUserInfo={this.state.currentUserInfo} 
                                setProfilePicture={this.setProfilePicture}
                                setProfilepic={this.state.setProfilepic}
                                {...this.props}
                            />   
                            <Admin currentPage={this.state.currentAdminPage} setcurrentPage={this.setCurrentAdminPage}/>
                        </div>                       
                        </Route>                                             
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default MainContent
