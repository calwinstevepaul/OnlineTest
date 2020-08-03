import React from 'react'
import './simpleHead.css'

export default function SimpleHead({ heading, search, onChange,onlineUsersState, changeOnlineUsersState, getOnlineUsersData}) {
    return (
        <div className="check-user-admin-1">
            <div className="check-user-admin-1-1"> {heading}</div>
            <div className="check-user-admin-1-2">
                {search
                    ?
                    <>  
                        <div>
                            <input onChange={onChange} className="search-box-simplehead" type="search" placeholder="search..."/>
                        </div>
                        <button onClick={changeOnlineUsersState} className="admin-btn">{onlineUsersState?'Show All Online Users':'Show Only Online Users'}</button>
                        <button onClick={()=>getOnlineUsersData()} className="admin-refresh"><i className="fas fa-redo"></i></button>
                        <div className="simplehead-date">{new Date().toDateString()}</div></>
                    : <div>{new Date().toDateString()}</div>
                }
            </div>
        </div>
    )
}
