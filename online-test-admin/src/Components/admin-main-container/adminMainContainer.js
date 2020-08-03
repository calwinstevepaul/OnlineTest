import React from 'react'
import './adminMainContainer.css'

export default function AdminMainContainer(props) {
    return (
        <div className="main-page-admin">
            {props.children}
        </div>
    )
}
