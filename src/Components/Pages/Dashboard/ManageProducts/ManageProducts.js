import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://agile-brushlands-55686.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [isDeleted]);

  //handle delete
  const handleDelete = id => {
    const handleConfirm = window.confirm('Are you sure to delete');
    if (handleConfirm) {
      fetch(
        `https://agile-brushlands-55686.herokuapp.com/deleteProduct/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        }
      )
        .then(res => res.json())
        .then(result => {
          if (result.deletedCount) {
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
      <div className="container mt-5">
        <div className=" mb-5">
          <h2 className="fw-bold">Manage Products </h2>
        </div>
        <div>
          <Row xs={1} sm={1} md={3} className="g-4 bg-white rounded-3">
            {products.map(product => {
              return (
                <Col>
                  <Card className="bg-white shadow rounded border-0 p-1">
                    <Card.Img
                      className="card-image img-fluid rounded"
                      variant="top"
                      src={product.img}
                    />
                    <Card.Body>
                      <Card.Title>{product.name.slice(0, 60)}...</Card.Title>
                      <Card.Text>
                        {product.description.slice(0, 110)}...
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <h4 className="mt-2">${product.price}</h4>
                        <Button
                          onClick={() => {
                            handleDelete(product._id);
                          }}
                          className="btn btn-danger fw-bold py-2 px-3 fw-bold"
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
};

export default ManageProducts;
