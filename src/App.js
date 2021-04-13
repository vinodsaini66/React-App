import './App.css';
import Login from './components/login';

import Home from './components/home';
import {BrowserRouter as  Router,Switch,Route,NavLink,Link} from 'react-router-dom';
import SignInOutContainer from './container';

function App() {
  // let navLink = (
  //   <div className="Tab">
  //   <NavLink to="/login" activeClassName="activeLink" className="login">Login</NavLink>
  //   </div>
  //   );

    const login = localStorage.getItem('isLoggedIn');
  return (
    <div className="App">
     <Home></Home>
     
    </div>
  );

}

export default App;