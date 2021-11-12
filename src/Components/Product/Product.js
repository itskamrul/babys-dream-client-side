import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Product.css';

const Place = ({ product, index, handleBooking }) => {
  const { _id, name, img, description, price } = product;

  return (
    <div>
      <Col>
        <Card className="bg-white shadow rounded border-0 p-1">
          <Card.Img
            className="card-image img-fluid rounded"
            variant="top"
            src={img}
          />
          <Card.Body>
            <Card.Title>{name.slice(0, 60)}...</Card.Title>
            <Card.Text>{description.slice(0, 110)}...</Card.Text>
            <div className="d-flex justify-content-between">
              <h4 className="mt-2">${price}</h4>
              <Link className="btn-regular" to={`/orderDetails/${_id}`}>
                Order Now
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default Place;
