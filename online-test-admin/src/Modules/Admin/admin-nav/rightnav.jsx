import React, { Component } from 'react'
import './rightnav.css'
import logo from '../../../img/logo.png'
import { withRouter } from 'react-router-dom'

export class rightnav extends Component {
    logout=()=>{
        this.props.changeLoginState(false)
        localStorage.clear()
        this.props.history.push('/')
 
 
     }
    render() {        
        const { currentPage, currentPageState ,setProfilePicture ,currentUserInfo} = this.props;
        return (
            <div className="admin-main-nav">
                <div className="rightnav">
                    <div className="admin-nav-logo">
                        <img  src={logo}  alt="logo"/>
                    </div>
                    <div className='user'>
                        <img src={currentUserInfo.profilePicture } alt='profile pic' className='user-profile'/>
                        <label htmlFor='imageupload' className='edit-profile'><i className="fas fa-camera cameras"></i></label>
                        <input type='file'  id='imageupload' className='imageupload' onChange={(e)=>setProfilePicture(e.target.files[0])}/>
                        <p>{this.props.currentUserInfo.name}</p>
                    </div>                
                    <ul className="admin-nav-ul">
                        <li className={`${currentPageState===0?'selected-adminsidenav':''}`} onClick={()=>currentPage(0)}><i className="fas fa-list"></i> <span>Questions</span> </li>
                        <li className={`${currentPageState===1?'selected-adminsidenav':''}`} onClick={()=>currentPage(1)}><i className="fas fa-user-friends"></i> <span>Users</span></li>
                        <li className={`${currentPageState===2?'selected-adminsidenav':''}`} onClick={()=>currentPage(2)}><i className="fas fa-plus"></i> <span>Add Questions</span> </li>
                        <li className={`${currentPageState===7?'selected-adminsidenav':''}`} onClick={()=>currentPage(7)}><i className="fas fa-search"></i> <span>Search By Code</span> </li>
                    </ul>
                    
                </div>
                <div className="adminlogout">
                    <button onClick={this.logout} className="adminlogout-btn">Logout</button>
                    <p>© copyright codingmart</p>
                </div> 
            </div>
        )
    }
}

export default withRouter (rightnav)
