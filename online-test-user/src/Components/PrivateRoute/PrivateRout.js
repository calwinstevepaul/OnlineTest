import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import MainContent from './MainContent';


function PrivateRoute(props) {        
    return (
        props.currentLoginState?
        <Route path="/home">
            <MainContent {...props}/>
        </Route>
        : 
        <Redirect to='/' />   
    )
}
export default PrivateRoute