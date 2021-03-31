import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import firebase from '../firebase';
import FormList from './FormList';

const db = firebase.firestore();

const UserList = () => {
  const {url, path} = useRouteMatch();
  const ref = db.collection('users');

  // States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract forms from database
  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          ...doc.data()
        });
      });
      setUsers(list);

      if (loading) {
        setLoading(false);
      }
    }, (error) => {
      console.log('snapshot error' + error);
    });
  }, []);

  if (loading) { 
    console.log('users loading')
    return <h3 className="loading">Users are loading...</h3>; 
  }

  return (
    <div>
      <Switch>
        <Route path={`${path}/:user`}>
          <FormList />
        </Route>
        <Route exact path={path}>
          <h3>What forms would you like to view?</h3>
          {users.map(user =>
            <Link 
              to={{
                pathname: `${url}/${user.name}`,
                // pathname: `${url}/${user.name.replace(/\s+/g, '')}`,
                state: { user: user }
              }}
              key={user.name}
            >
              <button>{user.name}</button>
            </Link>
          )}
          <Link to={`${url}/all`}><button>View all forms</button></Link>
        </Route>
      </Switch>
    </div>
  );
};

export default UserList;