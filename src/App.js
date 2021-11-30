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
import Bookings from './pages/Home/Bookings/Bookings';
function App() {
  

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
              <Home  ></Home>
            </Route>
            <PrivateRoute path="/bookings/:hotelId">
              <Bookings></Bookings>
            </PrivateRoute>
            <Route path="/hotels">
            <AllHotels ></AllHotels>
            </Route>
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
            <Route path="/mybookings">
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
