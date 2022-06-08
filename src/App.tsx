import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Axios from "axios";
import { RobotFactoryRoutes } from "routes";

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

Axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

function App() {
  return <RobotFactoryRoutes />;
}

export default App;
