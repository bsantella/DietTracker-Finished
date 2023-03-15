import React, { Component }  from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../App.css';

function DashboardPage() {

  function getData() {
    axios({
      method: "GET",
      url:"/dashboard",
    })
  }

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/');
  };

  const navigateToEditProfile = () => {
    navigate('/editprofile');
  };

  const navigateToTracker = () => {
    navigate('/tracker');
  }

  return (
    <>
      <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h1 class="header1">Dashboard</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
      <ButtonGroup className="buttonRow1">
        <Button onClick={navigateToTracker} className="button1" style={{ width: "300px", height: "300px",}}>Tracker</Button>
        <Button className="button2" style={{ width: "300px", height: "300px",}}>Notepad</Button>
      </ButtonGroup>
      </div>
      <br />
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <ButtonGroup className="buttonRow2">
        <Button onClick={navigateToEditProfile} className="button1" style={{ width: "300px", height: "300px",}}>Edit Profile</Button>
        <Button onClick={navigateToLogin} className="button2" style={{ width: "300px", height: "300px",}}>Logout</Button>
      </ButtonGroup>
      <br />
      </div>
    </>
  );
}

export default DashboardPage;