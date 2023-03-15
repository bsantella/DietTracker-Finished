import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import EditProfilePage from "./pages/editprofile";
import CreateAccountPage from "./pages/createaccount";
import TrackerPage from './pages/tracker';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="editprofile" element={<EditProfilePage/>} />
        <Route path="createaccount" element={<CreateAccountPage/>} />
        <Route path="tracker" element={<TrackerPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));