import React, { Component }  from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../createaccount.css';

function CreateAccountPage() {
  //Variables values changes when user inputs into fields
  //Variable initial values ('') should be from user's database
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  var modifiedData = new FormData();
  function postData() {
    axios({
      method: "POST",
      url: "/createaccount",
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

  function handleSubmit() {
    //Add code here to save values in variables into database
    //preventDefault();
    if ((firstName && lastName && userName && password) == "")
    {
      alert("Values must be filled out");
      return false;
    }
    else
    {
      modifiedData.append('firstName', firstName)
      modifiedData.append('lastName', lastName)
      modifiedData.append('userName', userName)
      modifiedData.append('password', password)
      navigateToLogin();
      postData();
    }
    
  }

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/');
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <h1>Create Account</h1>
          <div>
          <input type="text" id="firstName" name="firstName" value={firstName} placeholder="first name" onChange={(e) => setFirstName(e.target.value)}/>
          <input type="text" id="lastName" name="lastName" value={lastName} placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div>
          <input type="text" id="userName" name="userName" value={userName} placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div>
          <input type="password" id="password" value={password} name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div><button onClick={handleSubmit}>Create Account</button></div>
        </div>
      </div>
    </div>

  );
}

export default CreateAccountPage;