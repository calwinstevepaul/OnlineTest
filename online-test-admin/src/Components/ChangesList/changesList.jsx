import React from 'react'
import './changesList.css'
import ChangesMenu from '../../Components/QuestionMenu/changesMenu'

export default function ChangesList({ items, onClick, selectedChange, setcompareArray, compareArray ,handleScroll}) {

    const makeChangeString = (array) => {
        let c = 64353423;
        return array.map(e=>{
            if(e!==null){
                if(e.added){
                    return  <span key={c++} className="added-span">{` +${e.added} `}</span>
                }
                else if(e.removed){
                    return <span key={c++} className="removed-span">{` -${e.removed} `}</span>
                }
                else{
                    return <span key={c++}></span>
                }
            }else{
                return <span key={c++}></span>
            }
        })
    }

    

    

    return (
        <div className="Changes-List">
            <div className="list-heading">CHANGES</div>
                <div className="list-items" onScroll={handleScroll} >
            {
                items.map((item,index) =>{ 
                    // var date = new Date(item.updated_at)
                    // var hours = date.getHours();
                    // var minutes = date.getMinutes();
                    // var seconds = date.getSeconds();
                    // var ampm = hours >= 12 ? 'pm' : 'am';
                    // hours = hours % 12;
                    // hours = hours ? hours : 12; // the hour '0' should be '12'
                    // minutes = minutes < 10 ? '0'+minutes : minutes;
                    // var strTime = hours + ':' + minutes + ':' + seconds +' ' + ampm;
                        return(
                    <div className="list-item-flex" key={item._id}>
                        <div key={item._id} className={`${(selectedChange.c0===item || compareArray[0]===item || compareArray[1]===item)?'selected':''} change-list-item`} onClick={_=>onClick(item)}>
                            <div className="question-1">{`${new Date(item.updated_at).toLocaleTimeString()}`}</div>
                            <div className="question-2">{`${new Date(item.updated_at).toDateString()}`}</div>
                            {makeChangeString(item.diff[0].html)}
                            {makeChangeString(item.diff[0].css)}
                            {makeChangeString(item.diff[0].js)}
                        </div>
                        <ChangesMenu array={compareArray} item={item} setarray={array=>setcompareArray(array)}/>
                    </div>
                    )})
            }
        </div>
    </div>
    )
}
