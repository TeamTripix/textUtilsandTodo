import React from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
// import Login from "./components/Auth/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Routes> */}
          {/* <Route exact path="/" element={<Login />} /> */}
          {/* <Route exact path="home" element={<Home />} /> */}
          <Home/>
        {/* </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
