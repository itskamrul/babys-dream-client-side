import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const OrderDetails = () => {
  const [products, setProducts] = useState([]);
  const [isSubmit, setIsSubmit] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { users } = useAuth();
  const { productId } = useParams();
  //get data
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [isSubmit]);

  //find data
  const displayProuduct = products.find(product => product._id == productId);

  // submit booking data
  const onSubmit = data => {
    displayProuduct.userName = data.userName;
    displayProuduct.email = data.email;
    displayProuduct.gender = data.gender;
    displayProuduct.number = data.number;
    displayProuduct.address = data.address;
    displayProuduct.status = 'pending';
    displayProuduct._id = displayProuduct._id + 1;

    axios
      .post('http://localhost:5000/bookingProduct', displayProuduct)
      .then(res => {
        if (res.data.insertedId) {
          alert('Order successfully');
          setIsSubmit(true);
          reset();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className=" container  mt-2">
      <div className="row">
        <div className=" col-md-8 d-flex flex-column ">
          <img
            className="img-fluid rounded w-75"
            src={displayProuduct?.img}
            alt=""
          />
          <div className="text-start ">
            <h4>{displayProuduct?.name}</h4>
            <h5>Price: ${displayProuduct?.price}</h5>

            <p>
              <span className="fw-bold">Details: </span>
              {displayProuduct?.description}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ borderRadius: '10px' }} className="shadow p-3">
            <h3 style={{ color: '#2B6878', fontWeight: 'bold' }}>
              Order Information
            </h3>
            <form
              className="d-flex flex-column  "
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                defaultValue={users.displayName}
                style={{
                  border: '2px solid #2B6878',
                  borderRadius: '5px',
                  padding: '10px',
                }}
                className="mt-2"
                {...register('userName', { required: true })}
              />
              <input
                readOnly
                defaultValue={users.email}
                style={{
                  border: '2px solid #2B6878',
                  borderRadius: '5px',
                  padding: '10px',
                }}
                className="mt-2"
                {...register('email', { required: true })}
              />
              <select
                style={{
                  border: '2px solid #2B6878',
                  borderRadius: '5px',
                  padding: '10px',
                  marginTop: '10px',
                }}
                {...register('gender')}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <input
                style={{
                  border: '2px solid #2B6878',
                  borderRadius: '5px',
                  padding: '10px',
                }}
                className="mt-2"
                placeholder="Address"
                {...register('address', { required: true })}
              />
              <input
                style={{
                  border: '2px solid #2B6878',
                  borderRadius: '5px',
                  padding: '10px',
                }}
                type="number"
                className="mt-2"
                placeholder="Mobile number"
                {...register('number', { required: true })}
              />

              <input className="mt-2 btn btn-regular" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
