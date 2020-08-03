import React, { Component } from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './sideNav.css'

export class SideNav extends Component {
    render() {
        return (
            <div className='side-nav'>
                <FileCopyIcon className="files-logo" onClick={this.props.changeOpenDrawer}/>                
            </div>
        )
    }
}

export default SideNav
