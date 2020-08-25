import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';
import AuthMenu from './components/auth/AuthMenu/AuthMenu';
import Restricted from './components/restricted/Restricted';

function App() {
  return (
    <div className="App">
      <h2>My Login App</h2>
      <AuthMenu />
      <Router>
        <Link to="/restricted">restricted</Link>

        <Switch>
          <Route path="/restricted">
            <Restricted />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
