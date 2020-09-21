import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import About from "../pages/about.jsx"
import Home from "../pages/home.jsx"
import Movies from "../pages/Movies/movies.jsx"
import CreateMovies from "../pages/Movies/createmovies.jsx"
import EditMovies from "../pages/Movies/editmovies.jsx"
import Creategames from "../pages/Games/creategames.jsx"
import EditGames from "../pages/Games/editgames.jsx"
import Games from "../pages/Games/games.jsx"
import Login from "../pages/login.jsx"
import ChangePassword from "../pages/changepassword.jsx"
import Register from "../pages/Register.jsx"
import SingleMovie from "../pages/Movies/SingleMovie.jsx"
import SingleGame from "../pages/Games/SingleGame.jsx"

import {UserContext} from "../context/UserContext"


const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;
  const RegisterRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <>
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <Route exact path="/aboutme" user={user} component={About}/>
        <Route exact path="/detail-movie/:id" user={user} component={SingleMovie}/>
        <Route exact path="/detail-game/:id" user={user} component={SingleGame}/>

        <LoginRoute exact path="/login" user={user} component={Login}/>
        <RegisterRoute exact path="/register" user={user} component={Register}/>
        <PrivateRoute exact path="/change-password" user={user} component={ChangePassword}/>

        <PrivateRoute exact path="/movies" user={user} component={Movies}/>
        <PrivateRoute exact path="/games" user={user} component={Games}/>
        <PrivateRoute exact path="/movies/edit/:id" user={user} component={EditMovies}/>
        <PrivateRoute exact path="/movies/create" user={user} component={CreateMovies}/>
        <PrivateRoute exact path="/games/create" user={user} component={Creategames}/>
        <PrivateRoute exact path="/games/edit/:id" user={user} component={EditGames}/>


      </Switch>
      </>
  )
}

export default Section