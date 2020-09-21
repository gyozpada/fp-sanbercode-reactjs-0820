import React from 'react';
import Main from './layouts/Main';
import './App.css';
import 'antd/dist/antd.css'; 
// import Home from './Antd-Example/Home'
import {UserProvider} from "./context/UserContext"

function App() {
  return (
    <>
    <UserProvider>
        <Main />
      </UserProvider>
    {/* <Home/> */}

    </>
  );
}

export default App;
