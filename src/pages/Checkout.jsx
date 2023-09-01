import { MultipleFooter } from '../components/Footer/MultipleFooter';
import '../styles/checkout.css';
import { AiFillCheckCircle } from 'react-icons/ai';

const Checkout = () => {
  const fakeData = [];
  const maxNumberDataGen = 100;
  const ROLE_ID = {
    ADMIN: 0,
    CUSTOMER: 1,
    SHIPPER: 2,
  };
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  for (let i = 0; i <= maxNumberDataGen; i++) {
    fakeData.push({
      id: i,
      role: ROLE_ID.SHIPPER,
      name: `Shipper no${i}`,
      phoneNo: Math.floor(Math.random() * 1000000000),
    });
  }
  const selectedShiperr = fakeData[randomInteger(1, maxNumberDataGen)];
  return (
    <>
      <div className='checkoutMessage'>
        <div className='checkoutTitleContainer'>
          <AiFillCheckCircle className='checkoutIcon' />
          <h3>Thank you for your order!</h3>
        </div>
        <div className='shipper-info'>
          <div> Name: {selectedShiperr.name}</div>
          <div> Phone No: {selectedShiperr.phoneNo}</div>
        </div>
        <span>
          Your order is being processed and will be delivered as fast as
          possible.
        </span>
      </div>
      <MultipleFooter />
    </>
  );
};

export default Checkout;
