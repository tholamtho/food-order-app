import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from 'reactstrap';
import logo from '../../assets/images/res-logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { cartUiActions } from '../../store/shopping-cart/cartUiSlice';

import '../../styles/header.css';

export const USER_ROLE = {
  ADMIN: 1,
  CUSTOMER: 2,
  SHIPPER: 3,
};

const USER_DETAILS = JSON.parse(localStorage.getItem('user_info'));

const nav__links = [
  {
    display: 'Trang chủ',
    path: '/home',
  },
  {
    display: 'Đồ ăn',
    path: '/pizzas',
  },
  {
    display: 'Giỏ hàng',
    path: '/cart',
    isAdminHidden: true,
    isShipperHidden: true,
  },
  {
    display: 'Liên hệ',
    path: '/contact',
  },
  {
    display: 'Thông tin người dùng',
    path: `/user-infor/${USER_DETAILS?.username ?? 1}`,
  },
  {
    display: 'Đánh giá',
    path: `/grading/${USER_DETAILS?.username ?? ''}`,
    isAdminHidden: true,
  },
  {
    display: 'Quản lý người dùng',
    path: `/user-management`,
    isAdminOnly: true,
  },
  {
    display: 'Loggout',
    path: '/login',
    isLoggout: true,
  },
].filter((item) => {
  if (USER_DETAILS && USER_DETAILS.permission === USER_ROLE.ADMIN) {
    if (item.isAdminHidden) {
      return false;
    }
    return true;
  }
  if (item.isAdminOnly) {
    return false;
  }
  if (
    USER_DETAILS &&
    USER_DETAILS.permission === USER_ROLE.SHIPPER &&
    item.isShipperHidden
  ) {
    return false;
  }
  return true;
});

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');
  let navigate = useNavigate();

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef?.current.classList.add('header__shrink');
      } else {
        headerRef?.current.classList.remove('header__shrink');
      }
    });

    return () => window.removeEventListener('scroll');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLogined');
  };

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <div className='nav__wrapper d-flex align-items-center justify-content-between'>
          <div className='logo' onClick={() => navigate('/home')}>
            <img src={logo} alt='logo' />
            <h5>Món ngon đang chờ</h5>
          </div>
          {/* ======= menu ======= */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <div
              className='menu d-flex align-items-center gap-5'
              onClick={(event) => event.stopPropagation()}
            >
              <div className='header__closeButton'>
                <span onClick={toggleMenu}>
                  <i className='ri-close-fill'></i>
                </span>
              </div>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? 'active__menu' : ''
                  }
                  onClick={() => {
                    toggleMenu();
                    if (item.isLoggout) {
                      localStorage.removeItem('isLogined');
                      localStorage.removeItem('user_info');
                      window.location.pathname = '/login';
                    }
                  }}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className='nav__right d-flex align-items-center gap-4'>
            <span className='cart__icon' onClick={toggleCart}>
              <i className='ri-shopping-basket-line'></i>
              <span className='cart__badge'>{totalQuantity}</span>
            </span>

            <span className='mobile__menu' onClick={toggleMenu}>
              <i className='ri-menu-line'></i>
            </span>
            <span className='mobile__menu' onClick={handleLogout}>
              <i className='ri-menu-line'>Logout</i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
