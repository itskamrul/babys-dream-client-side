import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const GetReview = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
    console.log(data);

    axios
      .post('https://agile-brushlands-55686.herokuapp.com/getReview', data)
      .then(res => {
        if (res.data.insertedId) {
          alert('added successfully');
          reset();
        }
      });
  };
  return (
    <div>
      <div className=" w-50 mx-auto">
        <div style={{ borderRadius: '10px' }} className="shadow p-3 mt-3">
          <h1 style={{ color: '#32AEB1', fontWeight: 'bold' }}>
            Give Me Your Opinion
          </h1>
          <form
            className="d-flex flex-column  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              style={{
                border: '2px solid #32AEB1',
                borderRadius: '5px',
                padding: '10px',
              }}
              className="mt-2"
              placeholder="Name"
              {...register('name', { required: true })}
            />
            <input
              style={{
                border: '2px solid #32AEB1',
                borderRadius: '5px',
                padding: '10px',
              }}
              type="number"
              min="0"
              max="5"
              className="mt-2"
              placeholder="Rating(?/5)"
              {...register('rating', { required: true })}
            />
            <textarea
              style={{
                border: '2px solid #32AEB1',
                borderRadius: '5px',
                padding: '10px',
              }}
              className="mt-2"
              placeholder="Description"
              {...register('description', { required: true })}
            />
            <input className="mt-2 btn login-btn" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetReview;
