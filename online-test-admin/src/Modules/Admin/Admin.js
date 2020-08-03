import React, { Component } from "react";
import MainPage from "./admin-main/mainpage";
import "./Admin.css";
import AddQuestions from "../../Components/AddQuestions/AddQuestions"
import { authApi } from "../../apicall";
import Search from './search-snippet/search'
import ComparePage from './ComparePage/comparePage'
import ChangeCompare from './CompareChange/ChangeCompare'
import AdminUsers from './admin-users/AdminUsers'
import swal from 'sweetalert';


export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser:{},      //1>  select a user in users page
      selectedQuestion:{},  //    for edit question 
      clickedQuestion:{},   //1>  to set selected question users page
      searchItem:{},
      attendedQuestions:{}, //1>  all attended question in users page
      searchPage:'search'
    };
  }
  
setSearchPage = (page)=>{
  this.setState({
    searchPage:page
  })
}

AddQuestion = (question,action,id) => {
  if(action==='create'){
      authApi
      .post("/questions/create", question)
      .then(res => {
        swal({text : "Question Added", icon: "success"}).then(()=> this.props.setcurrentPage(0))
      })
      .catch(e => {
        swal({text : 'error creating question', icon: "error"})
      });
  }else if(action==='edit'){
      authApi
      .patch(`/questions/${id}`, question)
      .then(res => {
        swal({text : "Question Edited", icon: "success"}).then(()=> this.props.setcurrentPage(0))
      })
      .catch(e => {
        swal({text : 'error editing question', icon: "error"})
        alert("error editing question")
      });
  }
};

onEdit = (question)=>{
  this.setState({
    selectedQuestion:question
  })
}

setSearchItem = (item,searchValue)=>{
  this.setState({
    searchItem:{user:item,search:searchValue}
  })
}

//1 set clicked user as selected user
setSelectedUser = (user)=>{
   this.setState({selectedUser:user})
   this.getAttentedQuestions(user._id)
}

//1 to select a question for a user
setSelectedQuestion = (question) => {
  this.setState({
    clickedQuestion:question
  })
  this.props.setcurrentPage(3)
}

//1 get all attented question for a user when a user name is clicked in user page table
getAttentedQuestions = (id) =>{
  authApi.post('/users/questions',{_id:id})
  .then(data => {
    
    this.setState({attendedQuestions:data.data})
  })
  
}


renderSwitch(param) {
  const { setcurrentPage, currentPage } = this.props;
  switch(param) {
    case 0:return <MainPage 
                        heading={"Questions"} 
                        onEdit={this.onEdit} 
                        setcurrentPage={setcurrentPage} />
    case 1:return <AdminUsers  
                        setSelectedQuestion={this.setSelectedQuestion}
                        attendedQuestions={this.state.attendedQuestions} 
                        selectedUser={this.state.selectedUser}
                        setSelectedUser={this.setSelectedUser} 
                        currentPage={currentPage}/>
    case 2:return <AddQuestions 
                        AddQuestion={this.AddQuestion} 
                        action={'create'}/>
    case 3:return <ChangeCompare
                        onclose={()=>this.props.setcurrentPage(1)} 
                        selectedUser={this.state.selectedUser} 
                        selectedQuestion={this.state.clickedQuestion}/>
    case 5:return <AddQuestions 
                        AddQuestion={this.AddQuestion} 
                        action={'edit'} 
                        selectedQuestion={this.state.selectedQuestion}/>
    case 7:return <Search                                                       
                        setPage={this.setSearchPage} 
                        page={this.state.searchPage} 
                        setcurrentPage={setcurrentPage} 
                        setSearchItem={this.setSearchItem}/>
    case 8:return <ComparePage  
                        searchItem={this.state.searchItem} 
                        onClose={_=>this.props.setcurrentPage(7)}/>

    default:return <MainPage 
                        heading={"Questions"} 
                        onEdit={this.onEdit} 
                        setcurrentPage={setcurrentPage}/>
  }
}
  render() {
    const { currentPage } = this.props;
    return (
      <div className="admin-main-content">
        {this.renderSwitch(currentPage)}
      </div>
    );
  }
}

export default Admin;
