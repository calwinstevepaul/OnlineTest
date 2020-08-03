import React, { Component } from 'react'
import './AddQuestion.css'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/webpack-resolver";     
export class AddQuestions extends Component {
    state = {
        currentTab: 0,
        valueCSS: '',
        valueHTML: '',
        valueJS: '',
        title: '',
        description: ''
    }
    onSubmit = _ => {
        const { action, selectedQuestion } = this.props
        this.props.AddQuestion({
            title: this.state.title,
            description: this.state.description,
            html: this.state.valueHTML,
            css: this.state.valueCSS,
            js: this.state.valueJS,
        }, action, selectedQuestion ? selectedQuestion._id : null)
    }

    componentDidMount() {
        const { action, selectedQuestion } = this.props;
        
        if (action === 'edit') {
            this.setState({
                valueJS: selectedQuestion.js,
                valueCSS: selectedQuestion.css,
                valueHTML: selectedQuestion.html,
                title: selectedQuestion.title,
                description: selectedQuestion.description
            })
        }
    }


    onChange = newValue => {
        const { currentTab } = this.state;
        if (currentTab === 0) {
            this.setState({ valueHTML: newValue });
        } else if (currentTab === 1) {
            this.setState({ valueJS: newValue });
        } else if (currentTab === 2) {
            this.setState({ valueCSS: newValue });
        }
    };

    render() {
        const { currentTab, valueHTML, valueJS, valueCSS, } = this.state;
        return (
            <div className="addQuestion">
                <div className="addQuestionHedder">
                    <h2>Add Question</h2>
                    <button onClick={this.onSubmit}><i className="fas fa-plus"></i></button>

                </div>
                <label>TITLE:</label>
                <input className="addquestionInput" type="text" placeholder="Title" onChange={(e) => { this.setState({ title: e.target.value }) }} value={this.state.title} />

                <label>DESCRIPTION:</label>
                <input className="addquestionInput" type="text" placeholder="Description" onChange={(e) => { this.setState({ description: e.target.value }) }} value={this.state.description} />

                <label>CODE:</label>
                <div className="addquestionCode">
                    <div className="addquestionCodeTabs">
                        <button onClick={() => this.setState({ currentTab: 0 })} className={`${currentTab === 0 ? 'selectedTab' : ''}`}>HTML</button>
                        <button onClick={() => this.setState({ currentTab: 1 })} className={`${currentTab === 1 ? 'selectedTab' : ''}`}>JS</button>
                        <button onClick={() => this.setState({ currentTab: 2 })} className={`${currentTab === 2 ? 'selectedTab' : ''}`}>CSS</button>

                    </div>

                    {currentTab === 0
                        ?
                        <AceEditor
                            mode="html"
                            height='100%'
                            width='100%'
                            fontSize={16}
                            theme="tomorrow_night"
                            onChange={this.onChange}
                            value={valueHTML}
                            editorProps={{ $blockScrolling: false }}
                        />
                        : currentTab === 1
                            ?
                            <AceEditor
                                mode="javascript"
                                height='100%'
                                width='100%'
                                fontSize={16}
                                theme="tomorrow_night"
                                onChange={this.onChange}
                                value={valueJS}
                                editorProps={{ $blockScrolling: false }}
                            />
                            :
                            <AceEditor
                                mode="css"
                                height='100%'
                                width='100%'
                                fontSize={16}
                                theme="tomorrow_night"
                                onChange={this.onChange}
                                value={valueCSS}
                                editorProps={{ $blockScrolling: false }}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default AddQuestions
