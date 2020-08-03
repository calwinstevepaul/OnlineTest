import React, { Component } from 'react'
import './AdminUsers.css'
import {authApi} from '../../../apicall'
import SimpleHead from '../../../Components/SimpleHeading/simpleHead'
import UserList from '../../../Components/UserList/UserList'


export class mainpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             question:[],
             users:[],
             questionsMenu:false,
             searchValue:'',
             pageLimit:0,
             dataLength:0,
             onlineUsers:false,
             onlineUsersData:[],
             onlineUsersPagelimit:0
        }
    }
    componentDidMount(){
        this.getQuestions()
        this.getUsers()
        this.getOnlineUsersData()
    }
    changeOnlineUsersState=(value)=>{
        this.setState({
            onlineUsers:!this.state.onlineUsers
        })
    }
    getQuestions=()=>{
        authApi.get('/questions',{}).then(res=>{
            this.setState({
                question:res.data
            })
        })
    }
    getUsers=()=>{
        var page=this.state.pageLimit+1
        authApi.get(`/users?limit=15&page=${this.state.pageLimit}`).then(res=>{
            this.setState({
                users:[...this.state.users,...res.data.data],
                 pageLimit:page,
                dataLength:res.data.dataLength
            
            })
        })
    }
    getOnlineUsersData=()=>{
        var pageLimit=this.state.onlineUsersPagelimit
        authApi.get(`/users/onlineUsers?page=${pageLimit}&limit=15`).then(res=>{
                this.setState(prevState=>({
                   onlineUsersData:[...prevState.onlineUsersData , ...res.data],
                   onlineUsersPagelimit:prevState.onlineUsersPagelimit + 1
               }))
    
        })

    }
    getDataAfterLogout=()=>{
        var limit=15 * this.state.onlineUsersPagelimit
        authApi.get(`/users/onlineUsers?page=0&limit=${limit}`).then(res=>{
                this.setState({               
                onlineUsersData:res.data
                })
            
        })

    }
    searchUsers=(key)=>{
        authApi.get('/users/search?key='+key).then(res=>{
            this.setState({
                users:res.data
            })
        })
    }
    menuQuestion = (details,action)=>{
        const { setcurrentPage, onEdit } = this.props;
        if(action==='edit'){
            onEdit(details)
            setcurrentPage(5)
        }else if(action==='delete'){
            authApi.delete('/questions/'+details._id)
                .then(data =>{
                    this.setState((pre)=>{
                        return {
                            question:pre.question.filter(e=>e._id!==details._id)
                        }
                    })
                })
                .catch(err => console.log(err))
        }else if(action==='active'){
            authApi.get('/questions/active/'+details._id)
                .then(res => {
                    if(res.status===200){
                        let { question } = this.state;
                        question[question.indexOf(question.find(q => q.active))].active = false
                        question[question.indexOf(question.find(q => q._id===details._id))].active = true
                        this.setState({question})
                    }
                })
                .catch(err => console.log(err))
        }
        
    }
    
    handleScrollUsers=event=>{
        const bottom=parseInt(event.target.scrollHeight-event.target.scrollTop) === (event.target.clientHeight)
        // console.log(bottom,event.target.clientHeight,(event.target.scrollHeight-event.target.scrollTop));
        if(bottom) this.getUsers();
    }

    scrollOnlineUsers=event=>{
        const bottom=parseInt(event.target.scrollHeight-event.target.scrollTop) === (event.target.clientHeight)
        // console.log(bottom,event.target.clientHeight,(event.target.scrollHeight-event.target.scrollTop));
        if(bottom) 
        {
            this.getOnlineUsersData();
        }
    }
    

    render() {
        const { selectedUser, setSelectedUser, attendedQuestions ,setSelectedQuestion} = this.props;
        const { users,onlineUsersData }= this.state;
        return (
            <div className="users-table"> 
                <SimpleHead 
                    getOnlineUsersData={this.getOnlineUsersData}
                    heading="STUDENTS" 
                    search={true} 
                    onChange={e=>this.searchUsers(e.target.value)}   
                    onlineUsersState={this.state.onlineUsers} 
                    changeOnlineUsersState={this.changeOnlineUsersState}
                />
                
                <UserList
                    items={users} 
                    onlineUsersData={onlineUsersData}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser} 
                    attendedQuestions={attendedQuestions}
                    setSelectedQuestion={setSelectedQuestion}
                    scrollHandler={this.handleScrollUsers}
                    onlineUsersState={this.state.onlineUsers}
                    getUsers={this.getUsers}
                    getDataAfterLogout={this.getDataAfterLogout}
                    scrollOnlineUsers={this.scrollOnlineUsers}
                />
            </div>
        )
    }
}

export default mainpage
