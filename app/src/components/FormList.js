import React, { useState, useEffect } from 'react';
import {
  Switch,
  Link,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import ViewForm from './ViewForm';
import firebase from '../firebase';

const db = firebase.firestore();

const FormList = () => {
  const {url, path} = useRouteMatch();
  const { user } = useParams();
  const ref = user === 'all' ?
    db.collectionGroup('forms') :
    db.collectionGroup('forms').where("name", "==", `${user}`);

  // States
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract forms from database
  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setForms(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) { 
    console.log('forms loading')
    return <h3 className="loading">Forms are loading...</h3>; 
  }

  return(
    <div>
      <Switch>
        <Route path={`${path}/:formId`}>
          <ViewForm />
        </Route>
        <Route exact path={path}>
          <h3>Please select a form.</h3>
          <ul>
            {forms.map(form =>
              <li key={form.id}>
                <Link to ={{
                  pathname: `${url}/${form.id}`,
                  state: { data: form }
                }}
                >Form {form.id}</Link>
              </li>
            )}
          </ul>
        </Route>
      </Switch>
    </div>
  );
};

export default FormList;