import './App.css';
import RoutesNav from './route/nav';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './component/register/register'
import Login from './component/login/login'

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect to="/"></Redirect>
        <Switch>
          <Route exact path='/'>
            <Login></Login>
          </Route>
          <Route path='/registerUser'>
            <Register></Register>
          </Route>
          <Route path='/nav'>
            <RoutesNav />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;