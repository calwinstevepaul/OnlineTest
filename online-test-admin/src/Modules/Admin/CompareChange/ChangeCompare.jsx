import React, { useState, useEffect } from 'react'
import './ChangeCompare.css'
import ChangesList from '../../../Components/ChangesList/changesList'
import { authApi } from '../../../apicall'
import ReactDiffViewer from 'react-diff-viewer'
import DashbordHead from '../../../Components/DashboardHead/dashbordHead'

export default function ChangeCompare({ selectedQuestion, selectedUser,onclose }) {
    const questionId = selectedQuestion._id;
    const userId =selectedUser._id
    
    const [changes, setChanges] = useState([])
    const [selectedChange, setselectedChange] = useState({c0:{_id:0, html:'',css:'',js:''},c1:{_id:0, html:'',css:'',js:''}})
    const [ currentTab ,setCurrentTab] = useState('html')
    const [compareArray, setcompareArray] = useState([0,0])
    const limit=10
    const [pageNumber , setPageNumber]=useState(0)
    const [changesLength , setChangesLength]=useState(0)
    
    useEffect(() => {
       getChanges();
    },[])

    
     const getChanges=()=>{
        authApi.get(`/changes/${userId}/${questionId}/${limit}/${pageNumber}`)
        .then(data => {
            data.data.changes.map(items=>setChanges(prevChanges=>[...prevChanges,items]))
            setChangesLength(data.data.dataLength)
            setPageNumber(pageNumber+1)
        }).catch(err => {
            console.log('checkChange:line22',err)
        })
    }
    
    const diffViewCreate = (item) => {
        let index = changes.indexOf(item)+1 === changes.length ? changes.indexOf(item) :  changes.indexOf(item)+1     
        let next = changes[index]
        setselectedChange({c0:item,c1:next})
    }
    const setcompareArrayFunc = (array) => {
        setcompareArray(array)
        if(array[0]!==0 && array[1]!==0){
            setselectedChange({
                c0:array[0],
                c1:array[1]
            })
        }
    }
    const handleScroll=event=>{
       const bottom=event.target.scrollHeight-event.target.scrollTop === event.target.clientHeight 
       if(bottom && changes.length !== changesLength)  getChanges();
    }
    const DashBordItems = [
        {title:'NAME', value:selectedUser.name},
        {title:'EMAIL', value:selectedUser.email},
        {title:'COLLEGE', value:selectedUser.organization},
        {title:'TOTAL COMMITS', value:changesLength},
    ]
    return (
        <div className="change-compare-screen">
                <button onClick={onclose} className="change-compare-screen-close-btn" >x</button>
                
                <div className="changes-list">
                    <ChangesList 
                        items={changes}
                        onClick={diffViewCreate}
                        selectedChange={selectedChange}
                        setcompareArray={setcompareArrayFunc}
                        compareArray={compareArray}
                        handleScroll={handleScroll}/>
                </div>
                

                <div className="changes-view">
                    <DashbordHead values={DashBordItems} page="checkUser"/>
                    <div className="react-diff-viewer-1"> 
                        <div className="addquestionCodeTabs">
                            <button onClick={()=>setCurrentTab('html')} className={`${currentTab==='html'?'selectedTab':''}`}>HTML</button>
                            <button onClick={()=>setCurrentTab('js')} className={`${currentTab==='js'?'selectedTab':''}`}>JS</button>
                            <button onClick={()=>setCurrentTab('css')} className={`${currentTab==='css'?'selectedTab':''}`}>CSS</button>
                        </div>
                        <div className="diff-viewer">
                        <ReactDiffViewer 
                            oldValue={selectedChange.c1[currentTab]} 
                            newValue={selectedChange.c0[currentTab]} 
                            splitView={true}
                            showDiffOnly={false}
                            // useDarkTheme={true}
                            // hideLineNumbers={true}
                        /> 
                        </div>
                    </div>
                </div>

            </div>
    )
}
