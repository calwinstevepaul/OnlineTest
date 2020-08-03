import React from 'react'
import List from './List'
import './UserList.css';
import {authApi} from '../../apicall'

export default function UserList({ items, onlineUsersData, selectedUser, setSelectedUser, attendedQuestions, setSelectedQuestion, scrollHandler, onlineUsersState, getOnlineUsersData ,scrollOnlineUsers ,getDataAfterLogout}) {
    const removeOnlineUser=(value)=>{
        authApi.post("/users/adminremoveOnlineUser",{
            id:value
        }).then((res)=>{
            getDataAfterLogout()
        })
    }

    const removeAllOnlineUser=()=>{
        authApi.post("/users/removeAllOnlineUser",{ }).then((res)=>{
            getDataAfterLogout()
        })
      }
    return (
        <>
            {onlineUsersState
            ?
            <div className="users-table-inner" onScroll={scrollOnlineUsers}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>COLLEGE</th>
                            <th>LAST UPDATE</th>
                            <th><button className='logoutall-btn' onClick={()=>removeAllOnlineUser()}>Logout all</button></th>
                        </tr>

                    </thead>
                    <tbody>
                        {onlineUsersData.map((data, index) => {
                            if(data.isOnline){
                                return (
                                    <List
                                        onlineUsers={true}
                                        key={index}
                                        data={data}
                                        index={index}
                                        selectedUser={selectedUser}
                                        setSelectedUser={setSelectedUser}
                                        attendedQuestions={attendedQuestions}
                                        setSelectedQuestion={setSelectedQuestion}
                                        removeOnlineUser={removeOnlineUser}

                                    />
                                )                                
                            }
                            else return<></>

                        })}
                    </tbody>
                </table>
            </div>
            :
            <div className="users-table-inner" onScroll={scrollHandler}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>COLLEGE</th>
                            <th>LAST UPDATE</th>
                        </tr>

                    </thead>
                    <tbody>
                        {items.map((data, index) => {
                            return (
                                <List
                                    onlineUsers={false}
                                    key={index}
                                    data={data}
                                    index={index}
                                    selectedUser={selectedUser}
                                    setSelectedUser={setSelectedUser}
                                    attendedQuestions={attendedQuestions}
                                    setSelectedQuestion={setSelectedQuestion}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
            }
        </>
    )
}
