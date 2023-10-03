import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate, Row, Col, Button, Input } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Grading.scss';

export const GradingOrder = () => {
  const [currentRate, setRating] = useState(0);
  const defaultIconFontSize = 36;
  const { id } = useParams();
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const handleSubmitRating = () => {
    alert('Đã Đánh giá đơn hàng thành công. Cảm ơn quý khách');
  };

  return (
    <div className='rating-container'>
      <Row className='order-id-detail'>
        <div className='order-number'>Đơn hàng số: {id}</div>
      </Row>
      <Row className='rating-header'>
        <Col className='header-blank-col-1'></Col>
        <Col className='header-rate-col'>
          <Rate
            onChange={setRating}
            value={currentRate}
            allowHalf
            style={{ fontSize: `${defaultIconFontSize}px` }}
          />
          <br />
          <Rate
            value={currentRate}
            character={({ index }) => customIcons[index + 1]}
            style={{ fontSize: `${defaultIconFontSize}px` }}
            disabled
          />
        </Col>
        <Col className='header-blank-col-2'></Col>
      </Row>
      <Row className='comment-row'>
        <Col className='comment-blank-col'></Col>
        <Col className='comment-input-col'>
          <Input
            className='comment-input'
            placeholder='Để lại bình luận tại đây...'
          ></Input>
          <Row className='rating-btn-container'>
            <Button
              className='rating-btn'
              type='primary'
              onClick={handleSubmitRating}
            >
              Đánh giá
            </Button>
          </Row>
        </Col>
        <Col className='comment-blank-col'></Col>
      </Row>
    </div>
  );
};
