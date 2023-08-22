import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Pizzas from '../pages/Pizzas';
import PizzaDetails from '../pages/PizzaDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import { UserInfor } from '../pages/UserInfor';

const Routers = () => {
  return (
    <Routes>
      {/* <Route path='/login' element={<Login />} /> */}
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/pizzas' element={<Pizzas />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/user-infor' element={<UserInfor />} />
      <Route path='/pizzas/:id' element={<PizzaDetails />} />
    </Routes>
  );
};

export default Routers;
