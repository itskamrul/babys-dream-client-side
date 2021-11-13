import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Product from '../../../Product/Product';

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://agile-brushlands-55686.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);
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
          <h2 className="fw-bold">All Products </h2>
        </div>
        <div>
          <Row xs={1} sm={2} md={3} className="g-4 bg-white rounded-3">
            {products.map(product => {
              return <Product key={product._id} product={product}></Product>;
            })}
          </Row>
        </div>
      </div>
    );
  }
};

export default AllProducts;
