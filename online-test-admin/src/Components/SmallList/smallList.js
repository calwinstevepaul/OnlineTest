import React from 'react'
import QuestionMenu from '../QuestionMenu/QuestionMenu';
import live from '../../img/live.png';


export default function SmallList({ heading, items, menuQuestion, onClick, scrollHandler }) {

    return (
        <div className="mainpage-admin-3-2">
            <div className="mainpage-admin-3-2-1">{heading.toUpperCase()}</div>
            <div className="mainpage-admin-3-2-content" onScroll={scrollHandler}>
                {
                    items.map(item => (
                        <div className="mainpage-admin-3-2-2" key={item._id} onClick={_ => onClick(item)} >
                            <div className="question">
                                <div className="question-1">{item.title ? item.title.toUpperCase() : ''}</div>
                                <div className="question-2">{item.description}</div>
                            </div>                        
                            <div className="question-status">                                
                                {item.active?<img src={live} alt='questionStatus'/>:<></>}
                                <QuestionMenu onClick={(action) => menuQuestion(item, action)} state={item.active} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

