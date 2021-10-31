import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Inventory from './Inventory';
import {BrowserRouter, Route,Switch, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-2"> 
     Sample Grid
      </h3>
<nav className="navbar navbar-expand-sm bg-light navbar-dark">
  <ul className="navbar-nav">
    <li className="nav-item- m-1">
<NavLink className="btn btn-light btn-outline-primary" to="/home">
  Home
</NavLink>
    </li>
    <li className="nav-item- m-1">
<NavLink className="btn btn-light btn-outline-primary" to="/inventory">
  Inventory
</NavLink>
    </li>
  </ul>
</nav>
<Switch>
  <Route path="/home" component={Home}></Route>
  <Route path="/inventory" component={Inventory}></Route>
</Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
