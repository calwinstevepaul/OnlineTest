import React, { Component } from 'react'
import './iframe.css'

class iframe extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return  this.props.valueJS !== nextProps.valueJS || 
                this.props.valueHTML !== nextProps.valueHTML || 
                this.props.valueCSS !== nextProps.valueCSS ||
                this.props.showDescription !== nextProps.showDescription ||
                this.props.executeAgain !== nextProps.executeAgain
    }

    render() {
        const { valueJS, valueCSS, valueHTML ,Description ,showDescription} = this.props;
        console.log(showDescription);
        if(document.getElementById('iframe')){


            var frame = document.getElementById('iframe');

            var idoc = (frame.contentWindow || frame.contentDocument);
            if (idoc.document)idoc = idoc.document;

            idoc.body.innerHTML = valueHTML
            
            var style = document.createElement("style");
            style.setAttribute("type", "text/css");
            style.innerHTML = valueCSS;
            idoc.getElementsByTagName("head")[0].appendChild(style);

            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = valueJS;
            idoc.getElementsByTagName("body")[0].appendChild(script);
            
        }
        return (
        showDescription?<div className='browser-frame'>
                <div>
                    <h1> Test Instructions:</h1>
                    <ul>
                        <li>Please do not refresh the page or close the tab</li>
                        <li>Please inform the invigilator is case you face any problem </li>
                    </ul>
                   <h1> Question Description:</h1>
                    {Description}
                </div>
        </div>
        :
        // executeAgain
        <iframe title="myFrame" className="browser-frame" id="iframe"></iframe>
        
        
        )
    }
}

export default iframe
