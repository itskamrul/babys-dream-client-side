import React from 'react';
import Footer from '../../../Shared/Footer/Footer';
import NavBar from '../../../Shared/Navbar/NavBar';
import Story from '../Story/Story';
import Header from '../Header/Header';
import Products from '../Products/Products';
import Reviews from '../Reviews/Reviews';

const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Header></Header>
      <Products></Products>
      <Reviews></Reviews>
      <Story></Story>
      <Footer></Footer>
    </div>
  );
};

export default Home;
