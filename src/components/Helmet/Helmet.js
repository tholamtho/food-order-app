import React from 'react';

const Helmet = (props) => {
  document.title = props.title ?? 'Đồ án tốt nghiệp - Trương Thế Đạt';
  return <div className='w-100'>{props.children}</div>;
};

export default Helmet;
