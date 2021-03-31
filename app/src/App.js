import React from 'react';
import './styles/app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import MyForm from './components/MyForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <div className="app">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-form">New Form</Link>
          </li>
          <li>
            <Link to="/view-forms">View Forms</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new-form">
            <MyForm />
          </Route>
          <Route path="/view-forms">
            <UserList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
