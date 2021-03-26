import React from 'react';
import '../styles/app.scss';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ( { label, ...props } ) => {
  const [field, meta] = useField(props);
  // console.log(field);
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
  const [field, meta] = useField({...props, type: 'radio'});
  return (
    <>
      <label className="radio-input">
        {children}
        <input type="radio" {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

///////////////////////////
// Try to create a group for your radio buttons so that onError,
// only one error message pops up, asking to require a selection,
// rather than every radio button giving the error
//
//
// const MyRadioGroup = ( { children, label, ...props } ) => {
//   return (
//     <>
//       <h5 className="radio-group">{label}</h5>
//       <div>{children}</div>
//     </>
//   );
// }
//
///////////////////////////

const MyCheckbox = ( { children, ...props } ) => {
  const [field, meta] = useField({...props, type: 'checkbox'});
  // props.value = children;
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

const MyForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          date: '',
          pain: '',
          activity: [],
          recovery: [],
          notes: '',
          treatment: false,
          request: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, 'Must be 30 characters or less')
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values }) => (
          <Form>
            <MyTextInput 
              label="Name:"
              name="name"
              type="text"
            />
            <MyTextInput 
              label="Date:"
              name="date"
              type="date"
            />

            <h5>Pain Scale</h5>
            <div className="radio-group">
              <MyRadioButton name="pain" value="one">1</MyRadioButton>
              <MyRadioButton name="pain" value="two">2</MyRadioButton>
              <MyRadioButton name="pain" value="three">3</MyRadioButton>
              <MyRadioButton name="pain" value="four">4</MyRadioButton>
              <MyRadioButton name="pain" value="five">5</MyRadioButton>
              <MyRadioButton name="pain" value="six">6</MyRadioButton>
              <MyRadioButton name="pain" value="seven">7</MyRadioButton>
              <MyRadioButton name="pain" value="eight">8</MyRadioButton>
              <MyRadioButton name="pain" value="nine">9</MyRadioButton>
              <MyRadioButton name="pain" value="ten">10</MyRadioButton>
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

            <MyCheckbox name="treatment">Treatment Request?</MyCheckbox>
            {values.treatment ? (
              <MyTextField 
                name="request"
                cols="50"
                rows="5"
                placeholder="Description of treatment wanted..."
              />
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;