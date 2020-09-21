import React from "react"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <strong  style={{marginLeft: "10px",  marginTop: "15px" }}>copyright &copy; MovieGamesUlala </strong>
      <p  style={{ marginLeft: "1000px", marginTop: "10px" }}>
        <Link to={`/aboutme`}>About me</Link>
      </p>
       

    </footer>
  )
}

export default Footer