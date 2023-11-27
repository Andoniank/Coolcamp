import React from "react";
import {Route, Switch} from 'react-router-dom'
import CampsiteIndex from "./components/CampsitesIndex/CampsiteIndex";
import CampsiteShow from "./components/CampsiteShow/CampsiteShow";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/campsites/:campsiteId'>
          <CampsiteShow />
        </Route>
        <Route path='/campsites'>
          <CampsiteIndex />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
