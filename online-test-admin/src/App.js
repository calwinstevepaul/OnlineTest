import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import LoginSignup from './Modules/LoginSignup/LoginSignup';
import PrivateRoute from './Components/PrivateRoute/PrivateRout'

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token')?true:false)
  const changeLoginState=(value)=>{
    setIsLogin(value)    
  }
  return (
    <div> 
      <Router>
        <Switch>
          <Route exact path="/">            
            <LoginSignup changeLoginState={changeLoginState} currentLoginState={isLogin}/>
          </Route>     
          <PrivateRoute path="/home" changeLoginState={changeLoginState} currentLoginState={isLogin}/>       
        </Switch>
      </Router>
    </div>   
  );
}

export default App;
