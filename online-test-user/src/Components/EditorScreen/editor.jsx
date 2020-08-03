import React, { Component } from 'react'
import './editor.css'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/webpack-resolver";   
// import 'brace/mode/javascript'
// import 'brace/mode/html'
// import 'brace/theme/kuroir'
// import 'brace/mode/css'



class editor extends Component {
    render() {
        const { onChange, valueJS, valueCSS, valueHTML, currentTab, runScript, internetConnection } = this.props;
        console.log("value",valueJS);
        return (
            <div className="editor-container">
                <div className="editor-action-bar">
                    <div className="currentFileName"><p>{currentTab===0 || currentTab===3?'index.html':currentTab===1?'script.js':'style.css'}</p></div>
                    {internetConnection?<div className="online">online</div>:<div className='offline'>offline</div>}
                    <button className="run-button" onClick={runScript}>Run</button>
                </div>
            
            {currentTab===0 || currentTab===3
               ?
                <AceEditor
                    mode="html"
                    height='91%'
                    width='100%'
                    fontSize={16}
                    theme="tomorrow_night"
                    onChange={onChange}
                    value={valueHTML}
                    editorProps={{ $blockScrolling: false }}
                    />           
                :currentTab===1
                    ?
                     <AceEditor
                        mode="javascript"
                        height='91%'
                        width='100%'
                        fontSize={16}
                        theme="tomorrow_night"
                        onChange={onChange}
                        value={valueJS}
                        editorProps={{ $blockScrolling: false }}                        
                     />
                    : currentTab === 2
                    ?
                    <AceEditor
                    mode="css"
                    height='91%'
                    width='100%'
                    fontSize={16}
                    theme="tomorrow_night"
                    onChange={onChange}
                    value={valueCSS}
                    editorProps={{ $blockScrolling: false }}
                />:<></>
               }

          
            </div>
        )
    }
}

export default editor
