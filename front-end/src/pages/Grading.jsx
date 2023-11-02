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
        setCurrentOrders(data.data);
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
    });
    setRating(0);
    setRatingOrder({});
    currentComment.current = '';
    alert('Đã Đánh giá đơn hàng thành công. Cảm ơn quý khách');
  };

  const handleShowOrdersComment = (record) => {
    console.log(record);
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
  };

  const shipperColumns = [
    {
      title: 'Tên người đặt hàng',
      dataIndex: 'customersName',
      key: 'customersName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'customersAddress',
      key: 'customersAddress',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customersPhoneNo',
      key: 'customersPhoneNo',
    },
    {
      title: 'Mã vận đơn',
      dataIndex: 'orderID',
      key: 'orderID',
    },
    {
      title: 'Trạng thái giao hàng',
      key: 'Status',
      render: (_, record) => {
        if (record.orderStatus === ORDER_DETAIL_STATUS.Pending) {
          return (
            <Button onClick={() => handleShippingSuccess(record)}>
              Đã giao hàng
            </Button>
          );
        }
      },
    },
    {
      title: 'Thời gian nhận đơn',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Thời gian giao hàng',
      dataIndex: 'deliverTime',
      key: 'deliverTime',
    },
  ];

  const customersColumns = [
    {
      title: 'Tên người giao hàng',
      dataIndex: 'shipperName',
      key: 'shipperName',
    },
    {
      title: 'Mã vận đơn',
      dataIndex: 'orderID',
      key: 'orderID',
    },
    {
      title: 'Trạng thái giao hàng',
      key: 'Status',
      dataIndex: 'orderStatus',
    },
    {
      title: 'Đánh giá',
      key: 'oderRating',
      dataIndex: 'oderRating',
    },
    {
      title: 'Đánh giá',
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
              Đánh giá
            </Button>
          );
        }
      },
    },
    {
      title: 'Thời gian nhận đơn',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Thời gian giao hàng',
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
                Đánh giá
              </Button>
            </Row>
          </Col>
          <Col className='comment-blank-col'></Col>
        </Row>
      </Modal>
      {USER_DETAILS.permission === USER_ROLE.SHIPPER && (
        <div>
          <h3>Người dùng đánh giá</h3>
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
