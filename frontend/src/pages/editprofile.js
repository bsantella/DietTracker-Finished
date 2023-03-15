import React, { Component, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../editprofile.css';

//STYLIZE DROP DOWN MENUS
function EditProfilePage() {
  //Variables values changes when user inputs into fields
  //Variable initial values ('') should be from user's database
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [flag, setFlag] = React.useState('');

  function getData() {
    axios({
      method: "GET",
      url: "/editprofile",
    })
    .then((response) => {
      const data = response.data
      setUserName(data.userName)
      setPassword(data.password)
      setHeight(data.height)
      setAge(data.age)
      setGender(data.gender)
      setWeight(data.weight)
      setFlag(data.flag)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  var modifiedData = new FormData();
  function postData() {
    axios({
      method: "POST",
      url: "/editprofile",
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

  useEffect(() => {
    getData();
  }, [])

  const navigate = useNavigate();
  
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  function handleSubmit() {
    //Add code here to save values in variables into database
    if ((userName && password && height && age && weight) == "")
    {
      alert("Values must be filled out correctly");
      return false;
    }
    else
    {
      modifiedData.append('userName', userName)
      modifiedData.append('password', password)
      modifiedData.append('height', height)
      modifiedData.append('age', age)
      modifiedData.append('gender', gender)
      modifiedData.append('weight', weight)
      modifiedData.append('flag', flag)
      navigateToDashboard();
      postData();
    }    
  }

  return (
    <form>
      <head>
        <title>
          Profile Page
        </title>
      </head>
      
      <body>
        <div className="App-header">
          <header>
            <p>
              Edit Profile
            </p>
          </header>
        </div>
        <div className='App-body'>
          <form>
            <div>              
              <div>Username</div>              
              <input type="text" id="userName" name="userName" value={userName} placeholder="username" onChange={(e) => setUserName(e.target.value)}/>  
            </div>
            <div>
              <div>Password</div>                              
              <input type="password" id="password" value={password} name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>  
            </div>
            <div>
              <div>Height</div>                              
              <input type="number" id="height" name="height" value={height} placeholder="inches" onChange={(e) => setHeight(e.target.value)}/>  
            </div>
            <div>
              <div>Age</div>
              <input type="number" id="age" name="age" value={age} placeholder="years" onChange={(e) => setAge(e.target.value)}/>  
            </div>
            <div>
              <div>Gender</div>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>  
            </div>
            <div>
              <div>Weight</div>
              <input type="text" id="weight" name="weight" value={weight} placeholder="pounds" onChange={(e) => setWeight(e.target.value)}/>  
            </div>
            <div>
              <div>Exercise Flag</div> 
              <select value={flag} onChange={(e) => setFlag(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>            
            </div>
            <div className='submit'>
              <input onClick={handleSubmit} type="submit" value="Submit"/>
            </div>
          </form>
        </div>
      </body>  
    </form>       
  );
}
  
export default EditProfilePage;