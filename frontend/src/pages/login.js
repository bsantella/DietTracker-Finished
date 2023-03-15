import React, { Component }  from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../login.css';

function LoginPage() {

  //Variables values changes when user inputs into fields
  //Variable initial values ('') should be from user's database
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  var modifiedData = new FormData();
  function postData() {
    axios({
      method: "POST",
      url: "/",
      data: modifiedData
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  function handleLogin() {
    //Add code here to save values in variables into database
    //preventDefault();
    if ((userName && password) == "")
    {
      alert("Values must be filled out");
      return false;
    }
    else
    {
      modifiedData.append('userName', userName);
      modifiedData.append('password', password);
      navigateToDashboard();
      postData();
    }
  }

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const navigateToCreateAccount = () => {
    navigate('/createaccount');
  };

  return (
    <form>
      <div className="main">
        <div className="sub-main">
          <div>
            <h1>Diet Tracker</h1>
            <h1> Login Page</h1>
            <div>
              <input type="text" required="required" id="userName" name="userName" value={userName} placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
              <input type="password" required="required" id="password" value={password} name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div><button onClick={handleLogin}>Login</button></div>
            <div>
            </div>
            <div><button onClick={navigateToCreateAccount}>Create Account</button></div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;