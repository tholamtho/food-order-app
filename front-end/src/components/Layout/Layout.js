import React from 'react';

import Header from '../Header/Header.jsx';
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
        </div>
      )}
    </div>
  );
};

export default Layout;
