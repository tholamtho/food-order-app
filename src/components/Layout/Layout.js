import React from 'react';

import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Routes from '../../routes/Routers';
import Carts from '../UI/cart/Carts.jsx';

import { useSelector } from 'react-redux';
import { Login } from '../../pages/Login.jsx';

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const isLogined = localStorage.getItem('isLogined');

  return (
    <div className='d-flex flex-column vh-100 justify-content-between'>
      {!isLogined ? (
        <Login />
      ) : (
        <div>
          <Header />
          {showCart && <Carts />}
          <div>
            <Routes />
          </div>
          <Footer {...{ name: 'Trụ sở chính' }} />
          <Footer {...{ name: 'Cơ sở 1' }} />
          <Footer {...{ name: 'Cơ sở 2' }} />
          <Footer {...{ name: 'Cơ sở 3' }} />
          <Footer {...{ name: 'Cơ sở 4' }} />
        </div>
      )}
    </div>
  );
};

export default Layout;
