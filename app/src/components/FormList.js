import React, { useState, useEffect } from 'react';
import {
  Switch,
  Link,
  Route,
  useRouteMatch
} from 'react-router-dom';
import ViewForm from './ViewForm';
import firebase from '../firebase';

const db = firebase.firestore();

const FormList = () => {
  let {url, path} = useRouteMatch();
  let ref = db.collectionGroup('forms');

  // States
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setFormList(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) { 
    console.log('loading')
    return null; 
  }

  return(
    <div>
      <Switch>
        <Route path={`${path}/form/:formId`}>
          <ViewForm />
        </Route>
        <Route path={path}>
          <h3>Please select a form.</h3>
          <ul>
            {formList.map(form =>
              <li key={form.id}>
                <Link to ={{
                  pathname: `${url}/form/${form.id}`,
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

  // Retrieve data from firestore on load
  // useEffect(() => {
  //   forms.get().then((qs) => {
  //     let newList = [formList];
  //     qs.forEach((form) => {
  //       // console.log(form.data());
  //       newList.push(
  //         <li key={form.id}>
  //           <Link to={`${url}/${form.id}`}>Form {form.id}</Link>
  //         </li>
  //       );
  //     });
  //     setFormList(newList);
  //   });
  // }, []);

  // return(
  //   <div>
  //     <Switch>
  //       <Route path={`${path}/:formId`}>
  //         <ViewForm />
  //       </Route>
  //       <Route path={path}>
  //         <h3>Please select a form.</h3>
  //         <ul>{formList}</ul>
  //       </Route>
  //     </Switch>
  //   </div>
  // );
};

export default FormList;