import './App.css';
import React from 'react'
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
import Footer from './pages/Home/Shared/Footer/Footer'
import EditProfile from './pages/Home/EditProfile/EditProfile';
import MyProfile from './pages/Home/MyProfile/MyProfile';
import Login from './pages/Home/Login/Login';
import Signup from './pages/Home/Signup/Signup';
import PrivateRoute from './pages/Home/PrivateRoute/PrivateRoute';
import MyBookings from './pages/Home/MyBookings/MyBookings';
import Experiences from './pages/Home/Experiences/Experiences';
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
              <Home  ></Home>
            </Route>
            <Route path="/home">
              <Home aDate={aDate} setAdate={setAdate} setDdate={setDdate} dDate={dDate} ></Home>
            </Route>
            <PrivateRoute path="/hotels">
              <AllHotels aDate={aDate} setAdate={setAdate} setDdate={setDdate} dDate={dDate} ></AllHotels>
            </PrivateRoute>
            <Route path="/editprofile">
              <EditProfile></EditProfile>
            </Route>
            <Route path="/myprofile">
              <MyProfile></MyProfile>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/signup">
              <Signup></Signup>
            </Route>
            <Route path="/bookings">
              <MyBookings></MyBookings>
            </Route>
            <Route path="/reviews">
              <Experiences></Experiences>
            </Route>
          </Switch>

          
          <Footer></Footer>

        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
