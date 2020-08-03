import React from 'react'
import QuestionMenu from '../QuestionMenu/QuestionMenu'
import './itemList.css'

export default function ItemList({ type, items, heading, isOptions, onClick, onMenuClick }) {
    return (
        <div className="mainpage-admin-3-2">
                <div className="mainpage-admin-3-2-1">{heading.toUpperCase()}</div>
                {type ==='question'?
                    items.map(item => 
                        <div className="mainpage-admin-3-2-2" key={item._id} onClick={_=>onClick(item)}>
                            <div className="question">
                                <div className="question-1">{item.title?item.title.toUpperCase():''}</div>
                                <div className="question-2">{item.description}</div>
                            </div>
                            <div>
                            { isOptions
                                ?<QuestionMenu onClick={(action)=>onMenuClick(item,action)} state={item.active}/>
                                :<i className="fas fa-ellipsis-v"></i>
                            }
                            </div>
                        </div>)
                   
                    :type==='user'?
                    items.map(item =>
                        <div   className="mainpage-admin-3-2-2" key={item._id}>
                            <div className="question">
                                <div className="question-1">{item.name.toUpperCase()}</div>
                                <div className="question-2">{item.email}</div>
                                <div className="question-2">{item.organization}</div>
                            </div>
                            <div>
                                <i className="fas fa-ellipsis-v"></i>
                            </div>

                        </div>
                    )
                    :''
                }
            </div>
    )
}
