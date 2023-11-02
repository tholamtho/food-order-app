import React from 'react';

import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import '../styles/cart-page.css';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { cartActions } from '../store/shopping-cart/cartSlice';
import { Link } from 'react-router-dom';
import { MultipleFooter } from '../components/Footer/MultipleFooter';
import { addOrderDetail } from '../api/orderDetail';
import { v4 as uuidv4 } from 'uuid';
import { ORDER_DETAIL_STATUS } from '../components/UI/cart/Carts';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const USER_DETAILS = JSON.parse(localStorage.getItem('user_info'));

  const handleCheckout = async () => {
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
    window.location.reload();
  };

  return (
    <Helmet title='Cart'>
      <CommonSection title='Your Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              {cartItems.length === 0 ? (
                <h5 className='text-center'>Giỏ hàng trống</h5>
              ) : (
                <>
                  <h5 className='mb-5'>Giỏ hàng</h5>
                  <table className='table table-borderless mb-5 align-middle'>
                    <tbody>
                      {cartItems.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <div className='mt-4'>
                <h6>
                  Tổng cộng:
                  <span className='cart__subtotal'>{totalAmount} VND</span>
                </h6>
                <p>Ship và phụ phí</p>
                <div className='cart__page-btn'>
                  <button className='addTOCart__btn me-4'>
                    <Link to='/pizzas'>Tiếp tục mua sắm</Link>
                  </button>
                  <button className='addTOCart__btn' onClick={handleCheckout}>
                    <Link to='/checkout'>Thanh toán</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <MultipleFooter />
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };
  return (
    <tr>
      <td className='text-center cart__img-box'>
        <img src={image01} alt='' />
      </td>
      <td className='text-center'>{title}</td>
      <td className='text-center'>${price}</td>
      <td className='text-center'>{quantity}px</td>
      <td className='text-center cart__item-del'>
        <i className='ri-delete-bin-line' onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
