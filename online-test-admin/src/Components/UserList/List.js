import React, { Component } from 'react'


export class List extends Component {
    
    render() {
        const { setSelectedQuestion, selectedUser } = this.props;

        var date = new Date(this.props.data.last_update)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (
            <>
                {this.props.onlineUsers
                ?
                    <>
                        <tr>
                            <td>{this.props.index+1}</td>
                            <td>{this.props.data.name} </td>
                            <td>{this.props.data.email} </td>
                            <td>{this.props.data.organization} </td>
                            <td>{strTime}</td>
                            <td><button className='admin-btn' onClick={()=>this.props.removeOnlineUser(this.props.data._id)}>Logout</button></td>
                            
                        </tr>
                        
                    </>
                :
                    <>
                        <tr onClick={()=>{this.props.setSelectedUser(this.props.data)}}>
                            <td>{this.props.index+1}</td>
                            <td>{this.props.data.name} </td>
                            <td>{this.props.data.email} </td>
                            <td>{this.props.data.organization} </td>
                            <td>{strTime}</td>
                        </tr>
                        {selectedUser===this.props.data?
                        
                            <tr className="dropdown">
                                <td colSpan="5">
                                    <div className="dropdown-1">
                                        {this.props.attendedQuestions.length>0? 
                                            this.props.attendedQuestions.map((data,index) =>{
                                                return(
                                                    <div className="dropdown-1-questions" onClick={_=>setSelectedQuestion(data)} key={data._id}>
                                                        <div className="question-1">{data.title.toUpperCase()}</div>
                                                        <div className="question-2">{data.description}</div>
                                                    </div>  
                                                )
                                            })
                                            :
                                            <div>
                                                <p>No Questions</p>
                                            </div>
                                        }
                                    </div>
                                    
                                    
                                </td>
                            </tr>
                            
                        
                        :
                        <></>
                        }  
                    </>
                }
                
            </>


        )
    }
}

export default List
