import './App.css';
import React  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Home from './pages/Home/Home/Home';
import Header from './pages/Home/Shared/Header/Header';

import AuthProvider from './pages/Context/AuthProvider'
import AllHotels from './pages/Home/AllHotels/AllHotels';
function App() {
  const [aDate, setAdate] = React.useState(null);
  const [dDate, setDdate] = React.useState(null);
  
  return (
    <div className="App">
        <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home aDate={aDate} setAdate={setAdate} setDdate={setDdate}dDate={dDate} ></Home>
          </Route>
          <Route path="/home">
          <Home aDate={aDate} setAdate={setAdate} setDdate={setDdate}dDate={dDate} ></Home>
          </Route>
          <Route path="/hotels">
            <AllHotels aDate={aDate} dDate={dDate} setAdate={setAdate} setDdate={setDdate}></AllHotels>
          </Route>
         
        </Switch>
        
      </Router>
      </AuthProvider>
     
    </div>
  );
}

export default App;
