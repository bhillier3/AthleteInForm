import React, { useRef } from 'react';
import '../styles/app.scss';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase';

const db = firebase.firestore();

const MyTextInput = ( { label, ...props } ) => {
  const [field, meta] = useField(props);
  return (
    <>
      <h5>
        {label}
        <input className="text-input" {...field} {...props} />
      </h5>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
};

const MyTextField = ( { label, ...props } ) => {
  const [field, meta] = useField(props);
  return (
    <>
      <h5>
        {label}
        <textarea className="text-input" {...field} {...props} ></textarea>
      </h5>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const MyRadioButton = ( { children, ...props } ) => {
  const [field] = useField({...props, type: 'radio'});
  return (
    <>
      <label className="radio-input">
        {children}
        <input type="radio" {...field} {...props} />
      </label>
    </>
  );
};

const MyCheckbox = ( { children, ...props } ) => {
  const [field, meta] = useField({...props, type: 'checkbox'});
  return (
    <>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const addForm = async(info) => {
  let userInfo = { name: info.name, email: "foo@bar.com" };
  await db.collection('users').doc(info.name).set(userInfo);
  await db.collection('users').doc(info.name).collection('forms').add(info);
}

const MyForm = () => {
  const notifySumbit = useRef();

  return (
    <div>
      <Formik
        initialValues={{
          first: '',
          last: '',
          date: '',
          pain: '',
          activity: [],
          recovery: [],
          notes: '',
          treatment: false,
          request: ''
        }}
        validationSchema={Yup.object({
          first: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          last: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          date: Yup.date()
            .max(new Date(), 'Date cannot be a future date')
            .required('Required'),
          pain: Yup.string()
            .required('Required'),
          treatment: Yup.boolean(),
          request: Yup.string()
            .when('treatment', {
              is: true,
              then: Yup.string().required('Must include description of wanted treatment')
            })
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // add data to firestore databse
          let info = { ...values };
          info.pain = parseInt(info.pain);
          // are fist and last still necessary if have name?
          info.name = `${info.first} ${info.last}`;
          // info.date = firebase.firestore.Timestamp.fromDate(new Date(info.date));
          addForm(info);

          // notify user of submission and reset form
          notifySumbit.current.innerHTML = "Form Submitted!";
          setTimeout(() => {
            notifySumbit.current.innerHTML = "";
            setSubmitting(false);
            resetForm();
          }, 1500);
        }}
      >
        {({ values, setFieldValue, handleChange, errors }) => (
          <Form>
            <MyTextInput 
              label="First Name:"
              name="first"
              type="text"
            />
            <MyTextInput 
              label="Last Name:"
              name="last"
              type="text"
            />
            <MyTextInput 
              label="Date:"
              name="date"
              type="date"
            />

            <div className="radio-group">
              <h5>Pain Scale</h5>
              <div className="error">{errors.pain}</div>
              <MyRadioButton name="pain" value="1">1</MyRadioButton>
              <MyRadioButton name="pain" value="2">2</MyRadioButton>
              <MyRadioButton name="pain" value="3">3</MyRadioButton>
              <MyRadioButton name="pain" value="4">4</MyRadioButton>
              <MyRadioButton name="pain" value="5">5</MyRadioButton>
              <MyRadioButton name="pain" value="6">6</MyRadioButton>
              <MyRadioButton name="pain" value="7">7</MyRadioButton>
              <MyRadioButton name="pain" value="8">8</MyRadioButton>
              <MyRadioButton name="pain" value="9">9</MyRadioButton>
              <MyRadioButton name="pain" value="10">10</MyRadioButton>
            </div>

            <div className="checkbox-group">
              <h5>Today's Activity</h5>
              <MyCheckbox name="activity" value="workout">Workout</MyCheckbox>
              <MyCheckbox name="activity" value="long run">Long Run</MyCheckbox>
              <MyCheckbox name="activity" value="cross train">Cross Training</MyCheckbox>
            </div>

            <div className="checkbox-group">
              <h5>Recovery Exercises Completed</h5>
              <MyCheckbox name="recovery" value="foam roll">Foam Roll</MyCheckbox>
              <MyCheckbox name="recovery" value="stretch">Stretching</MyCheckbox>
              <MyCheckbox name="recovery" value="ice bath">Ice Bath</MyCheckbox>
              <MyCheckbox name="recovery" value="boots">Compression Boots</MyCheckbox>
              <MyCheckbox name="recovery" value="theragun">Theragun</MyCheckbox>
              <MyCheckbox name="recovery" value="ice">Ice cup/bag</MyCheckbox>
              <MyCheckbox name="recovery" value="other">Other</MyCheckbox>
            </div>

            <MyTextField 
              label="Injury/Soreness Notes:"
              name="notes"
              cols="100"
              rows="5"
              placeholder="Description of soreness or possible injury..."
            />

            <MyCheckbox name="treatment" onChange={e => {
              handleChange(e);
              setFieldValue('request', '', true);
            }}>Treatment Request?</MyCheckbox>
            {values.treatment ? (
              <MyTextField 
                name="request"
                cols="50"
                rows="5"
                placeholder="Description of treatment wanted..."
              />
            ) : null }

            <button type="submit" >Submit</button>
            <h3 ref={notifySumbit} className="notify"></h3>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;