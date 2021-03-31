import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewForm = () => {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div>
      <h3>Form ID: {data.id}</h3>
      <h4>Name: {data.name}</h4>
      <h4>Date: {data.date}</h4>
      <h4>Pain: {data.pain}</h4>
      <h4>Treatment Requested? {data.treatment ? 'Yes' : 'No'}</h4>
      {data.treatment ? 
        <h5>Treatment Wanted: {data.request}</h5>
        : null
      }
      <h5>Notes: {data.notes}</h5>
      <h4>Recovery:</h4>
      <ul>{data.recovery.map(exercise =>
        <li key={exercise}>{exercise}</li>
      )}</ul>
      <h4>Activity:</h4>
      <ul>{data.activity.map(activity =>
        <li key={activity}>{activity}</li>
      )}</ul>
    </div>
  );
};

export default ViewForm;