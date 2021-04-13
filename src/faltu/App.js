
import './App.css';
import Login from './components/login';
import {BrowserRouter as  Router,Switch,Route,NavLink,Link} from 'react-router-dom';

function App() {
  let navLink = (
    <div className="Tab">
    <NavLink to="/login" activeClassName="activeLink" className="login">Login</NavLink>
    </div>
    );

    const login = localStorage.getItem('isLoggedIn');
  return (
    <div className="App">
     { login ? (
       <Router>
         <Route exact path="/login" component={Login}></Route>
       </Router>

     ) : (
      <Router>
        {navLink}
         <Route exact path="/login" component={Login}></Route>
    </Router>
     )}
     <Router>
     <Switch>
       <Route exact path="/myR1">
         <h1>Route 1</h1>
       </Route>
       <Route exact path="/myR2">
         <h1>Route 2</h1>
       </Route>
       <Route exact path="/">
         <h1>Welcome </h1>
       </Route>
     </Switch>
     </Router>
    </div>
  );

}

export default App;




