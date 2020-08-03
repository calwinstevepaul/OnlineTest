import React, { Component } from 'react'
import './homepage.css'

import Editor from '../../../Components/EditorScreen/editor'
import Frame from '../../../Components/iFrame/iframe'
import SideNav from '../../../Components/Sidenav/SideNav'
import SideNavFiles from '../../../Components/SideNavFiles/SideNavFiles' 
import {authApi} from '../../../apicall'
import swal from 'sweetalert';

const jsdiff = require('diff');

class Homepage extends Component {
    state = {
        valueJSS:``,
        valueCSSS:``,
        valueHTMLL:``,
        valueJS:``,
        valueCSS:``,
        valueHTML:``,
        currentTab: 0,
        openDrawer:false,
        questionId:'',
        temp:{js:``,css:``,html:``},
        internetConnection:true,
        internetOffline:0,
        questionDescription:'',
        showDescription:false,
        executeAgain:false
        
    }
    componentDidMount(){
        this.setInitialQuestion();
        setInterval(this.saveData,10000)
        setInterval(()=>{
            this.checkInternetConnection()

        },60000)
    } 
   
    checkInternetConnection=()=>{
        let online = window.navigator.onLine;
        console.log(online)
        if (online) {
            console.log('online');
            this.setState({
                internetOffline:parseInt(0),
                internetConnection:true
            })
        } else {
            console.log('offline =',this.state.internetOffline);
            this.setState({
                internetOffline:parseInt(this.state.internetOffline+1),
                internetConnection:false
            })
            this.autoDownloadFiles()
        }
    }

    autoDownloadFiles=()=>{
        if(this.state.internetOffline === 5){
            console.log("DOWNLOADING FILES AS THERE IS NO INTERNET CONNECTION FOR A LONG TIME")
            this.downloadFiles()
            swal({text :`As there is no internet connectionfor a long time,
            DOWNLOADING FILES  .............................` ,icon: "warning"})
           
        }
    }

    downloadFiles = () =>{
        let files = [
            {
                type:"html",
                code:this.state.valueHTML,
                name:"index.html"
            },
            {
                type:"css",
                code:this.state.valueCSS,
                name:"style.css"

            },
            {
                type:"js",
                code:this.state.valueJS,
                name:"script.js"

            }
        ]
        files.map(data=>{
            const element = document.createElement("a");
            const file = new Blob([data.code], {type: data.type});
            element.href = URL.createObjectURL(file);
            element.download = data.name;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            return null
        }) 

    }
   
    changeOpenDrawer=()=>{
      this.setState({
        openDrawer:!this.state.openDrawer
      })
    }
    onChange = (newValue) => {

        const { currentTab } = this.state;
        // console.log(newValue,currentTab)
        if(currentTab === 0){
          this.setState({valueHTML: newValue})
        }else if(currentTab === 1){
          this.setState({valueJS: newValue})
        }else if(currentTab === 2){
            this.setState({valueCSS: newValue})
        }
        else{
            this.setState({valueHTML: newValue})
        }
    }
    changeTab = (newTab) => {
        if(newTab === 3)
        {
            this.setState({
                currentTab:newTab,
                showDescription:true
              })
        }
        else{
        this.setState({
          currentTab:newTab,
          showDescription:false
        })
    }
    }
    runScript = () => {
        this.setState((prevState)=>{
            return {valueJSS :  prevState.valueJS,
            valueCSSS: prevState.valueCSS,
            valueHTMLL: prevState.valueHTML,
            executeAgain:!prevState.executeAgain,
            showDescription:false
        }
        })
    }    

    setInitialQuestion = ()=>{
        authApi.get(`/questions/active/`
        ).then(res=>{

            console.log(res.data);
            if(res.data.alreadyUser)
            {
                this.setState({
                    valueCSS:res.data.question.css,
                    valueHTML:res.data.question.html,
                    valueJS:res.data.question.js,
                    questionId:res.data.question.questionId,
                    temp:res.data.question,
                    questionDescription:res.data.questionDescription
                },()=>{
                    this.runScript()

                })
            }
           else {
               
                this.setState({
                    valueCSS:res.data.question[0].css,
                    valueHTML:res.data.question[0].html,
                    valueJS:res.data.question[0].js,
                    questionId:res.data.question[0]._id,
                    temp:res.data.question[0],
                    questionDescription:res.data.question[0].description
                },_=>{
                    this.runScript()
                    
                })
                this.addUserId(res.data.question[0]._id)

            }
            
        })
    }
    addUserId=(questionId)=>{
        console.log(questionId);
        authApi.post('/questions/adduserid',{questionId:questionId})
        .then(res=>{
            // console.log(res);
            
        })
    }
    saveData = ()=> {
        const { valueJS, valueHTML, valueCSS, questionId, temp } = this.state;
        if(valueCSS !== temp.css || valueHTML !== temp.html || valueJS !== temp.js)
        {
            let html = jsdiff.diffTrimmedLines(temp.html,valueHTML).map(part => {
                return part.added ? { added:part.count } :
                part.removed ? { removed:part.count } : null;
            })
            let css = jsdiff.diffTrimmedLines(temp.css,valueCSS).map(part => {
                return part.added ? { added:part.count } :
                part.removed ? { removed:part.count } : null;
            })
            let js = jsdiff.diffTrimmedLines(temp.js,valueJS).map(part => {
                return part.added ? { added:part.count } :
                part.removed ? { removed:part.count } : null;
            })
    
            let diff = {
                html,
                css,
                js
            }

            authApi.post('/changes',{
                updated_at:new Date(),
                userId:this.props.userInfo._id,
                questionId:questionId,
                html:valueHTML,
                css:valueCSS,   
                js:valueJS,
                diff
            })
            .then((res)=>{
                console.log('res::',res)
            })
            .catch((e)=>{
                console.log("error::",e.message)
            })
            temp.css = valueCSS
            temp.html = valueHTML
            temp.js = valueJS
            this.setState({
                temp
            })
            
        }
    }


    render() {
        const { 
                valueJS, 
                valueJSS, 
                valueCSS, 
                valueCSSS, 
                valueHTML, 
                valueHTMLL, 
                currentTab, 
                questionDescription, 
                showDescription, 
                executeAgain
            } = this.state;
        return (
            <div className="homepage">
                <SideNav  
                    openDrawerState={this.state.openDrawer} 
                    changeOpenDrawer={this.changeOpenDrawer}
                />
                
                {this.state.openDrawer 
                ?
                    <SideNavFiles 
                        onChange={this.changeTab} 
                        currentTab={currentTab} 
                        runScript={this.runScript}/> 
                :
                    <></>
                }
                
                <Editor 
                    onChange={this.onChange} 
                    valueJS={ valueJS}
                    valueCSS={ valueCSS}
                    valueHTML={ valueHTML}
                    currentTab={currentTab}
                    runScript={this.runScript}
                    internetConnection={this.state.internetConnection}
                />
                <Frame valueJS={valueJSS}
                    valueCSS={valueCSSS}
                    valueHTML={valueHTMLL}
                    Description={questionDescription}
                    showDescription={showDescription}
                    executeAgain={executeAgain}
                />
            </div>
        )
    }
}

export default Homepage
