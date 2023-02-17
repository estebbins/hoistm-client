import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditLabel = (props) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    axios.get(`/labels/${props.match.params.id}`)
      .then(response => {
        setLabel(response.data.label);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedLabel = {
      label: label
    };

  return (
    <div>
      <h3>Edit Label</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Label: </label>
          <input type="text" required className="form-control" value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Update Label" className="btn btn-dark" />
        </div>
      </form>
    </div>
  );
};

export default EditLabel;
