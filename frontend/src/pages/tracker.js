import React, { Component, useEffect }  from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../tracker.css';

function TrackerPage() {

  const [totalCal, setTotalCal] = React.useState(0);
  const [totalProtein, setTotalProtein] = React.useState(0);
  const [totalFat, setTotalFat] = React.useState(0);
  const [totalCarb, setTotalCarb] = React.useState(0);
  const [userCal, setUserCal] = React.useState('');
  const [userProtein, setUserProtein] = React.useState('');
  const [userFat, setUserFat] = React.useState('');
  const [userCarb, setUserCarb] = React.useState('');
  const [dailyCal, setDailyCal] = React.useState(0);
  const [dailyCarb, setDailyCarb] = React.useState(0);
  const [dailyFat, setDailyFat] = React.useState(0);
  const [dailyProtein, setDailyProtein] = React.useState(0);

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 50
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 1s ease-in-out'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };

  let calPercent = totalCal / (Number(dailyCal)+1) * 100;
  let proteinPercent = totalProtein / (Number(dailyProtein)+1) * 100;
  let carbPercent = totalCarb / (Number(dailyCarb)+1) * 100;
  let fatPercent = totalFat / (Number(dailyFat)+1) * 100;

  const testData = [
    { bgcolor: "#dc143c", completed: calPercent.toFixed(2) },
    { bgcolor: "#00695c", completed: proteinPercent.toFixed(2) },
    { bgcolor: "#ef6c00", completed: carbPercent.toFixed(2) },
    { bgcolor: "#6a1b9a", completed: fatPercent.toFixed(2) }
  ];

  //const [completed, setCompleted] = useState(0);


  function handleEnter() {
    setTotalCal(totalCal + Number(userCal))
    setTotalProtein(totalProtein + Number(userProtein))
    setTotalFat(totalFat + Number(userFat))
    setTotalCarb(totalCarb + Number(userCarb))
    setDailyCal(2253)
    setDailyCarb(275)
    setDailyFat(78)
    setDailyProtein(60)
    setUserCal('')
    setUserCarb('')
    setUserFat('')
    setUserProtein('')
  }

  function handleLeave() {
    modifiedData.append("calories", totalCal)
    modifiedData.append("protein", totalProtein)
    modifiedData.append("carbohydrates", totalCarb)
    modifiedData.append("fat", totalFat)
    navigateToDashboard()
    postData();
  }

  var modifiedData = new FormData();
  function postData() {
    axios({
      method: "POST",
      url: "/tracker",
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

  function getData() {
    axios({
      method: "GET",
      url: "/tracker",
    })
    .then((response) => {
      const data = response.data
      /*setTotalCal(data.calories)
      setTotalCarb(data.carbohydrates)
      setTotalFat(data.fat)
      setTotalProtein(data.protein)
      setDailyCal(data.totalCals)
      setDailyCarb(data.totalCarbs)
      setDailyFat(data.totalFat)
      setDailyProtein(data.totalProtein)
      */
      setTotalCal(0)
      setTotalCarb(0)
      setTotalFat(0)
      setTotalProtein(0)
      
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  useEffect(() => {
    getData();
    //setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, [])

  return (
    <html>
      <head>
        <title>
          Tracker Page
        </title>
      </head>
      
      <body>
        <div className="App-header">
          <header>
            <p>
              Tracker
            </p>
          </header>
        </div>
        <div className='App-body'>
          <form>
            <div>              
              <div>Daily Caloric Intake</div>              
              <input type="number" id="totalCal" name="totalCal" value={totalCal} placeholder="calories"/>  
            </div>
            <div>
              <div>
              <input type="text" placeholder=""/>
              </div>
            </div>
            <div>Manual input</div>
            <div className='box'>
              <div className='box-child'>
                  <input type="number" id="userCal" style={{color: "#dc143c", fontWeight: "bold" }} name="userCal" value={userCal} placeholder="Calories" onChange={(e) => setUserCal(e.target.value)}/>
                  <input type="number" id="userProtein" style={{color: "#00695c" , fontWeight: "bold" }} name="userProtein" value={userProtein} placeholder="Protein (g)" onChange={(e) => setUserProtein(e.target.value)}/>  
              </div>
              <div className='box-child'>
                  <input type="number" id="userCarb" style={{color: "#ef6c00", fontWeight: "bold" }} name="userCarb" value={userCarb} placeholder="Carbohydrates (g)" onChange={(e) => setUserCarb(e.target.value)}/>
                  <input type="number" id="userFat" style={{color: "#6a1b9a", fontWeight: "bold" }} name="userFat" value={userFat} placeholder="Fat (g)" onChange={(e) => setUserFat(e.target.value)}/>  
              </div> 
            </div>
            <div style={{ paddingTop: 50 }}>
              Percentages Calculated Based on Harris-Benedict Formula.
            </div>
            <div style={{ }}>
            (2253 Calories, 61g Protein, 276g Carbohydrates, 79g Fat)
            </div>
            <div className="progress-bar">
              {testData.map((item, idx) => (
                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
              ))}
            </div>
            <div className='button-group'>
              <div className='button'>
                  <input onClick={handleEnter} type="button" value="Enter"/>
              </div>
              <div className='button'>
                  <input type="button" value="Save"/>
                  <input type="button" value="Load"/>
              </div>
              <div className='button'>
                  <input onClick={handleLeave} type="button" value="Back"/>
              </div>
            </div> 
          </form>
        </div>
      </body>
    </html>          
  );
}
  
  export default TrackerPage;