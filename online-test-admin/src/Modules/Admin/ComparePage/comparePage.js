import React, { useRef, useEffect, useState } from 'react'
import AdminMainContainer from '../../../Components/admin-main-container/adminMainContainer'
import DashbordHead from '../../../Components/DashboardHead/dashbordHead'
import AceEditor from "react-ace";

import './comparePage.css'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow_night";

//for search
export default function ComparePage({ searchItem, onClose }) {
    const [currentTab, setcurrentTab] = useState('javascript')

    const inputEl = useRef(null);
    const { user, search } = searchItem;
    const dashbordHeadValues = [
        {title:'NAME',value:user.userId.name},
        {title:'EMAIL',value:user.userId.email},
        {title:'COLLEGE/UNIVERSITY',value:user.userId.organization},
        {title:'LAST ACTIVE',value:`${new Date(user.userId.last_update).toLocaleDateString()}-${new Date(user.userId.last_update).toLocaleTimeString()}`},
        {title:'TIME OF CHANGE',value:`${new Date(user.updated_at).toLocaleDateString()}-${new Date(user.updated_at).toLocaleTimeString()}`}
    ]

    useEffect(() => {
       inputEl.current.editor.find(search)
    }, [search])

    return (
        <AdminMainContainer>
            <button className="close-button-search-page" onClick={onClose}>x</button>
            <DashbordHead values={dashbordHeadValues} page="checkUser"/>
            <div className="admin-inner-bottom">
                        <div className="addquestionCodeTabs">
                                    <button onClick={()=>setcurrentTab('javascript')} className={`${currentTab==='javascript'?'selectedTab':''}`}>JS</button>
                                    <button onClick={()=>setcurrentTab('html')} className={`${currentTab==='html'?'selectedTab':''}`}>HTML</button>
                                    <button onClick={()=>setcurrentTab('css')} className={`${currentTab==='css'?'selectedTab':''}`}>CSS</button>

                                </div>
                         <AceEditor
                            width="100%"
                            height="100%"
                            ref={inputEl}
                            mode={currentTab}
                            fontSize={16}
                            theme="tomorrow_night"
                            onChange={value=>console.log(value)}
                            value={currentTab==='javascript'?user.js:currentTab==='css'?user.css:user.html}
                            name="ace"
                            editorProps={{ $blockScrolling: true }}
                        />
            </div>
        </AdminMainContainer>
    )
}
