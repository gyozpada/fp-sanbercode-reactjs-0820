import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header"
import Section from "./Section"
import Footer from "./Footer"


const Main = () =>{
  return(
    <>
      <Router>        
        <Header/>
        <Section/>
        <Footer/>
      </Router>
    </>
  )
}

export default Main