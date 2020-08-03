import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import LoginSignup from './Modules/LoginSignup/LoginSignup';
import PrivateRoute from './Components/PrivateRoute/PrivateRout'
import {authApi} from './apicall'


function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('token')?true:false)
  const changeLoginState=(value)=>{
    setIsLogin(value)    
  }

  const addOnlineUser=(id)=>{
    authApi.post("/users/addOnlineUser",{id:id}).then((res)=>{
        console.log(res)        
    })
  }
  const removeOnlineUser=()=>{
    authApi.post("/users/removeOnlineUser",{}).then((res)=>{
    console.log(res)        
    })
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">            
            <LoginSignup 
              changeLoginState={changeLoginState} 
              currentLoginState={isLogin}
              addOnlineUser={addOnlineUser} 
            />
          </Route>     
            <PrivateRoute 
              path="/home"  
              changeLoginState={changeLoginState} 
              currentLoginState={isLogin} 
              removeOnlineUser={removeOnlineUser}
            />       
        </Switch>
      </Router>
    </div>   
  );
}

export default App;
