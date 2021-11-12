import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const BookingDash = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(null);
  const [isUpdate, setIsUpdate] = useState(null);

  //get data
  useEffect(() => {
    fetch('http://localhost:5000/allBooking')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setIsLoading(false);
      });
  }, [isDeleted]);

  //handle delete
  const handleDelete = id => {
    const handleConfirm = window.confirm('Are you sure to delete');
    if (handleConfirm) {
      fetch(`http://localhost:5000/deleteBooking/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(result => {
          if (result.deletedCount) {
            setIsDeleted(true);
          } else {
            setIsDeleted(false);
          }
        });
    }

    console.log(id);
  };

  //handle approve modifiedCount
  const handleApprove = id => {
    const handleConfirm = window.confirm('Are you sure to Update');
    console.log(id);
    const data = bookings.find(place => place._id === id);
    data.status = 'Shipped';

    if (handleConfirm) {
      fetch(`http://localhost:5000/update/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(result => {
          if (result.modifiedCount) {
            setIsDeleted(true);
          } else {
            setIsDeleted(false);
          }
        });
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="container ">
        <h2> Booking Dashboard</h2>
        <div className="row">
          {bookings.map(booking => (
            <div key={booking._id} className=" text-start col-md-4 mt-3   p-2">
              {/* <img className="w-25 rounded" src={booking.img} alt="" /> */}
              <div className=" ms-3">
                <h5>{booking.name}</h5>
                <h6>
                  Status:{' '}
                  {booking.status == 'pending' ? (
                    <span className="text-danger"> {booking.status}</span>
                  ) : (
                    <span className="text-success"> {booking.status}</span>
                  )}
                </h6>
                <h6>Price: ${booking.price}</h6>
                <div>
                  <p className="mb-0">Name: {booking.userName}</p>
                  <p className="mb-0">Email: {booking.email}</p>
                  <p className="mb-0">Number: {booking.number}</p>
                  <p className="mb-0">Gender: {booking.gender}</p>
                  <Button
                    onClick={() => {
                      handleDelete(booking._id);
                    }}
                    className="btn btn-success fw-bold py-2 px-3 fw-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleApprove(booking._id);
                    }}
                    className="btn btn-regular fw-bold ms-3"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default BookingDash;
