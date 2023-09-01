import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Pizzas from '../pages/Pizzas';
import PizzaDetails from '../pages/PizzaDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import { UserInfor } from '../pages/UserInfor';

export const hideFooterPage = {
  LOGIN: 'login',
  INFOR: 'user-infor',
};

export const APP_ROUTE = {
  HOME: '/home',
  PIZZAS: '/pizzas',
  CART: '/cart',
  CHECKOUT: '/checkout',
  INFO: `/${hideFooterPage.INFOR}/:id`,
  PIZZA_DETAILS: '/pizzas/:id',
};

const Routers = () => {
  return (
    <Routes>
      {/* <Route path='/login' element={<Login />} /> */}
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path={APP_ROUTE.HOME} element={<Home />} />
      <Route path={APP_ROUTE.PIZZAS} element={<Pizzas />} />
      <Route path={APP_ROUTE.CART} element={<Cart />} />
      <Route path={APP_ROUTE.CHECKOUT} element={<Checkout />} />
      <Route path={APP_ROUTE.INFO} element={<UserInfor />} />
      <Route path={APP_ROUTE.PIZZA_DETAILS} element={<PizzaDetails />} />
    </Routes>
  );
};

export default Routers;
