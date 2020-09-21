import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {AppBar, Toolbar, Button, Grid} from "@material-ui/core"

const Header =() =>{
  const [user, setUser] = useContext(UserContext)

  const styleLinkNavbar={
    color: "inherit",
    textDecoration: "none"
}


const handleLogout = () =>{
  setUser(null)
  localStorage.removeItem("user")
  localStorage.clear()
}

  return (
    <AppBar position="static">
    <Toolbar>
      <Grid
        justify="space-between"
        container 
        spacing={24}
      >
        <Grid item>
          <Button color="inherit">
            <Link style={styleLinkNavbar} to="/">Home</Link>
          </Button>
          <Button color="inherit">
          { user && <Link style={styleLinkNavbar} to="/movies">Movie Editor </Link> }
          </Button>
          <Button color="inherit">
          { user && <Link style={styleLinkNavbar} to="/games">Games Editor </Link> }
          </Button>
        </Grid>
  
        <Grid item>
          <div>
            {
              user === null && (
                <>
                  <Button color="inherit">
                    <Link style={styleLinkNavbar} to="/login">Login</Link>  
                  </Button>
                  <Button color="inherit">
                    <Link style={styleLinkNavbar} to="/register">Register</Link>  
                  </Button>
                </>
              )
            }

            {
              user !== null && (
                <>
                  <Button color="inherit">
                    Hallo, {user.name}
                  </Button>
                  <Button color="inherit">
                    <Link style={styleLinkNavbar} to="/change-password">Change Password</Link>  
                  </Button>
                  <Button onClick={handleLogout} color="inherit">
                    Logout
                  </Button>
                </>
              )
            }
          </div>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)
}

export default Header