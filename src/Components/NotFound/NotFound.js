import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../images/notFound.png';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 page not found';
  }, []);
  return (
    <div>
      <div>
        <img className=" img-fluid" src={notFound} alt="" />
      </div>
      <Link to="/home" className="btn-regular">
        GO Back
      </Link>
    </div>
  );
};

export default NotFound;
