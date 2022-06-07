import React from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { RobotsList } from "pages/robots-list";
import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

Axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RobotsList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
