import React from 'react';
import Helmet from '../components/Helmet/Helmet.js';
import { Container, Row, Col } from 'reactstrap';

import { Link } from 'react-router-dom';

import guyImg from '../assets/images/delivery-guy.png';
import '../styles/hero-section.css';
import { MultipleFooter } from '../components/Footer/MultipleFooter.jsx';

const Home = () => {
  return (
    <Helmet title='Home'>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <h5 className='mb-3'>Simple Ordering & Fast Delivering</h5>
                <h1 className='mb-4 hero__title'>
                  <span>Enjoy</span> your favorite foods
                </h1>

                <button className='order__btn d-flex align-items-center justify-content-between '>
                  <Link to='/pizzas'>
                    Menu <i className='ri-arrow-right-s-line'></i>
                  </Link>
                </button>
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={guyImg} alt='delivery-guy' className='w-100' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <MultipleFooter />
    </Helmet>
  );
};

export default Home;
