import React from 'react';

import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { cartUiActions } from '../../../store/shopping-cart/cartUiSlice';

import { v4 as uuidv4 } from 'uuid';

import '../../../styles/shopping-cart.css';
import { addOrderDetail } from '../../../api/orderDetail';

export const ORDER_DETAIL_STATUS = {
  Pending: 'Pending',
  Complete: 'Complete',
};

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const USER_DETAILS = JSON.parse(localStorage.getItem('user_info'));

  const toggleCart = async () => {
    await addOrderDetail({
      customersName: USER_DETAILS.username,
      customersAddress: USER_DETAILS.userAddress,
      customersPhoneNo: USER_DETAILS.phoneNo,
      shipperName: '',
      orderID: uuidv4(),
      orderStatus: ORDER_DETAIL_STATUS.Pending,
      orderRating: '',
      orderComment: null,
      orderTime: new Date().toLocaleString(),
      totalCost: Number(totalAmount),
    });

    dispatch(cartUiActions.toggle());
    window.location.reload();
  };
  return (
    <div className='cart__container' onClick={toggleCart}>
      <ListGroup onClick={(event) => event.stopPropagation()} className='cart'>
        <div className='cart__closeButton'>
          <span onClick={toggleCart}>
            <i className='ri-close-fill'></i>
          </span>
        </div>

        <div className='cart__item-list'>
          {cartProducts.length === 0 ? (
            <h6 className='text-center'>Giỏ hàng trống</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} onClose={toggleCart} />
            ))
          )}
        </div>

        <div className='cart__bottom d-flex align-items-center justify-content-between'>
          <h6>
            Tổng cộng : <span>{totalAmount} VND</span>
          </h6>
          <button>
            <Link to='/checkout' onClick={toggleCart}>
              Thanh toán
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
