import React, { Component } from 'react'
import './SideNavFiles.css'
import htmllogo from "../../img/html-logo.png";
import jslogo from "../../img/js-logo.png";
import csslogo from "../../img/css-logo.png";
import descriptionlogo from "../../img/desc.png"
export class SideNavFiles extends Component {
    render() {
        const { currentTab  } = this.props;
        return (
            <div className="files">
                <ul className='filesname'>
                    <li className={`${currentTab===0?'highlight':''}`} onClick={()=>this.props.onChange(0)}>
                        <img src={htmllogo} style={{marginLeft:"-8px",marginRight:"-1px"}} width="40px" height="40px" alt="html"/>
                        <p>index.html</p>
                    </li>
                    <li className={`${currentTab===1?'highlight':''}`} onClick={()=>this.props.onChange(1)}>
                        <img src={jslogo} width="20px" height="20px" alt="js"/>
                        <p>script.js</p>
                    </li>
                    <li className={`${currentTab===2?'highlight':''}`} onClick={()=>this.props.onChange(2)}>
                        <img src={csslogo} width="20px" height="20px" alt="css"/>
                        <p>style.css</p>        
                    </li>
                    <li className={`${currentTab===3?'highlight':''}`} onClick={()=>this.props.onChange(3)}>
                        <img src={descriptionlogo} width="20px" height="20px" alt="desc"/>
                        <p>Readme</p>        
                    </li>
                </ul>
            </div>
        )
    }
}

export default SideNavFiles
