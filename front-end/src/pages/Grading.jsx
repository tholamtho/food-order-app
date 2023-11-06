import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate, Row, Col, Button, Input, Modal, Table } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Grading.scss';
import {
  changeOrderDetails,
  getAllCustomerOrderDetail,
  getAllShipperOrderDetail,
} from '../api/orderDetail';
import { USER_ROLE } from '../components/Header/Header';
import { ORDER_DETAIL_STATUS } from '../components/UI/cart/Carts';

export const GradingOrder = () => {
  const [currentRate, setRating] = useState(0);
  const defaultIconFontSize = 36;
  const { id } = useParams();
  const [currentOrders, setCurrentOrders] = useState([]);
  const [openRating, setOpenRating] = useState(false);
  const [ratingOrder, setRatingOrder] = useState({});
  const currentComment = useRef('');
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const USER_DETAILS = JSON.parse(localStorage.getItem('user_info'));
  useEffect(() => {
    if (USER_DETAILS.permission === USER_ROLE.CUSTOMER) {
      getAllCustomerOrderDetail(id).then((data) => {
        setCurrentOrders(data.data.filter((item) => !item.graded));
      });
    } else {
      getAllShipperOrderDetail(id).then((data) => {
        setCurrentOrders(data.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitRating = () => {
    setOpenRating(false);
    changeOrderDetails({
      ...ratingOrder,
      orderComment: currentComment.current,
      oderRating: Math.round(currentRate),
      graded: true,
    });
    setRating(0);
    setRatingOrder({});
    currentComment.current = '';
    alert('Thanks for your grading order. See you in next orders!');
    window.location.reload();
  };

  const handleShowOrdersComment = (record) => {
    return (
      <div>
        <div>Người đánh giá: {record.customersName}</div>
        <Rate
          defaultValue={record.oderRating}
          disabled
          style={{ fontSize: `${24}px` }}
        />
        <div>Comment: {record.orderComment}</div>
      </div>
    );
  };

  const handleShippingSuccess = (record) => {
    changeOrderDetails({
      ...record,
      shipperName: USER_DETAILS.username,
      orderStatus: ORDER_DETAIL_STATUS.Complete,
      deliverTime: new Date().toLocaleString(),
    });
    window.location.reload();
  };

  const shipperColumns = [
    {
      title: 'Customer name',
      dataIndex: 'customersName',
      key: 'customersName',
    },
    {
      title: 'Customer Adress',
      dataIndex: 'customersAddress',
      key: 'customersAddress',
    },
    {
      title: 'Customer PhoneNo',
      dataIndex: 'customersPhoneNo',
      key: 'customersPhoneNo',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderID',
      key: 'orderID',
    },
    {
      title: 'Order status',
      key: 'Status',
      render: (_, record) => {
        if (record.orderStatus === ORDER_DETAIL_STATUS.Pending) {
          return (
            <Button onClick={() => handleShippingSuccess(record)}>
              Delivered
            </Button>
          );
        }
      },
    },
    {
      title: 'Order Time',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Delivery time',
      dataIndex: 'deliverTime',
      key: 'deliverTime',
    },
  ];

  const customersColumns = [
    {
      title: 'Shipper name',
      dataIndex: 'shipperName',
      key: 'shipperName',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderID',
      key: 'orderID',
    },
    {
      title: 'Order Status',
      key: 'Status',
      dataIndex: 'orderStatus',
    },
    {
      title: 'Rated Order',
      key: 'oderRating',
      dataIndex: 'oderRating',
    },
    {
      title: 'Order Rating',
      key: 'Final',
      render: (_, record) => {
        if (
          record.orderStatus === ORDER_DETAIL_STATUS.Complete &&
          !record.oderRating
        ) {
          return (
            <Button
              onClick={() => {
                setOpenRating(true);
                setRatingOrder(record);
              }}
            >
              Rating Order
            </Button>
          );
        }
      },
    },
    {
      title: 'Order Time',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Delivery Time',
      dataIndex: 'deliverTime',
      key: 'deliverTime',
    },
  ];
  return (
    <div className='rating-container'>
      <Table
        dataSource={currentOrders}
        columns={
          USER_DETAILS.permission === USER_ROLE.CUSTOMER
            ? customersColumns
            : shipperColumns
        }
      />
      <Modal
        open={openRating}
        footer={null}
        onCancel={() => setOpenRating(false)}
      >
        <Row className='order-id-detail'>
          <div className='order-number'>Customer's name: {id}</div>
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
              placeholder='Leave your comment here...'
              onChange={(e) => {
                currentComment.current = e.target.value;
              }}
            ></Input>
            <Row className='rating-btn-container'>
              <Button
                className='rating-btn'
                type='primary'
                onClick={handleSubmitRating}
              >
                Rating order
              </Button>
            </Row>
          </Col>
          <Col className='comment-blank-col'></Col>
        </Row>
      </Modal>
      {USER_DETAILS.permission === USER_ROLE.SHIPPER && (
        <div>
          <h3>User rating</h3>
          {currentOrders
            .filter((item) => item.orderStatus === ORDER_DETAIL_STATUS.Complete)
            .map((record) => {
              return handleShowOrdersComment(record);
            })}
        </div>
      )}
    </div>
  );
};
