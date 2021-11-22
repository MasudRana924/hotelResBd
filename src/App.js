import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Home from './pages/Home/Home/Home';
import Header from './pages/Home/Shared/Header/Header';
import AllHotels from './pages/Home/AllHotels/AllHotels';
import Places from './pages/Home/Places/Places';


function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
          <Home></Home>
          </Route>
          <Route path="/hotels">
            <AllHotels></AllHotels>
          </Route>
          <Route path="/places">
            <Places></Places>
          </Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
