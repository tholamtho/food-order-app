import {
  Avatar,
  Skeleton,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Table,
} from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { isEmpty } from 'lodash';
import { EditOutlined, StarFilled } from '@ant-design/icons';
import './UserInfor.scss';
import { changeUserDetails } from '../api/userDetail';
import { USER_ROLE } from '../components/Header/Header';
import { getAllCustomerOrderDetail } from '../api/orderDetail';
import { useParams } from 'react-router-dom';

const changeInforInputName = {
  name: 'name',
  email: 'email',
  phoneNo: 'phoneNo',
  dateOfBirth: 'dateOfBirth',
  address: 'address',
  password: 'password',
};
const firstColInput = [
  changeInforInputName.phoneNo,
  changeInforInputName.address,
];
const secondColInput = [
  changeInforInputName.email,
  changeInforInputName.password,
];

export const UserInfor = (info) => {
  const { Meta } = Card;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const USER_DETAILS = JSON.parse(localStorage.getItem('user_info'));
  const [currentOrders, setCurrentOrders] = useState([]);

  const [userFormInstance] = Form.useForm();

  const currentUserInfo = {
    name: USER_DETAILS.username,
    email: USER_DETAILS.email,
    address: USER_DETAILS.userAddress,
    phoneNo: USER_DETAILS.phoneNo,
    avatarLink:
      'https://i.pinimg.com/564x/b6/74/44/b67444cabdb5aaadb6735e75df1bcc5c.jpg',
  };

  const currentData = useRef(currentUserInfo);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // fetchUser()
    }, 2000);
  }, []);

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const handleSubmit = () => {
    const payloadData = {
      ...USER_DETAILS,
      emai:
        userFormInstance.getFieldValue(changeInforInputName.email) ??
        USER_DETAILS.email,
      password:
        userFormInstance.getFieldValue(changeInforInputName.password) ??
        USER_DETAILS.password,
      phoneNo:
        userFormInstance.getFieldValue(changeInforInputName.phoneNo) ??
        USER_DETAILS.phoneNo,
      userAddress:
        userFormInstance.getFieldValue(changeInforInputName.address) ??
        USER_DETAILS.userAddress,
    };
    //Submit form
    changeUserDetails(payloadData);
    handleCloseEditModal();
  };

  const handleRenderForm = (inputFields, data) => {
    return inputFields.map((item) => {
      return (
        <Form.Item name={data[item]}>
          <Input placeholder={data[item]} />
        </Form.Item>
      );
    });
  };

  useEffect(() => {
    if (USER_DETAILS.permission === USER_ROLE.CUSTOMER) {
      getAllCustomerOrderDetail(id).then((data) => {
        setCurrentOrders(data.data.filter((item) => item.graded));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserStarRated = () => {
    return Array(info.rated ? info.rated : 5).fill(
      <StarFilled style={{ color: '#FFF700', width: 24 }} />
    );
  };

  useEffect(() => {
    if (!isEmpty(info)) {
      currentData.current = info;
    }
  }, [info]);

  const getUserInfor = () => {
    return (
      <div>
        <div>Name: {currentData.current.name}</div>
        <div>Phone Num: {currentData.current.phoneNo}</div>
        <div>
          Address:
          {currentData.current.address
            ? currentData.current.address
            : 'Not defined yet'}
        </div>
        <div>Email: {currentData.current.email}</div>
      </div>
    );
  };

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
      title: 'Thời gian nhận đơn',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Thời gian giao hàng',
      dataIndex: 'deliverTime',
      key: 'deliverTime',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
  ];

  return (
    <div className='user-infor-container'>
      <Skeleton loading={loading} avatar active>
        <Row>
          <Col style={{ width: '15%' }}></Col>
          <Col className='user-details'>
            <div style={{ marginTop: 16, fontSize: 24 }}>
              Details Information
            </div>
            {getUserInfor()}
          </Col>
          <Col style={{ width: '20%' }}></Col>
          <Col className='user-actions'>
            <Meta
              avatar={
                <Avatar src={currentData.current.avatarLink} size={248} />
              }
            />
            <div className='rated-user' style={{ marginTop: 16 }}>
              {getUserStarRated()}
            </div>
            <Row className='edit-inf-btn-container'>
              <Button
                className='edit-inf-btn'
                onClick={() => setIsOpenEditModal(true)}
              >
                <EditOutlined key='edit' />
              </Button>
            </Row>
          </Col>
        </Row>
      </Skeleton>
      <Modal
        className='change-infor-modal'
        open={isOpenEditModal}
        onCancel={handleCloseEditModal}
        closable={false}
        title={"Edit user's information"}
        footer={null}
      >
        <div className='edit-avt-container'>
          <Row>
            <Col>
              <Meta
                avatar={
                  <Avatar src={currentData.current.avatarLink} size={64} />
                }
              />
            </Col>
            <Col>
              <div href='#'>Change your avatar</div>
            </Col>
          </Row>
          <Row className='change-infor-inputs'>
            <Form form={userFormInstance}>
              <Row>
                <Col style={{ width: '10%' }} />
                <Col style={{ width: '40%' }}>
                  {handleRenderForm(firstColInput, changeInforInputName)}
                </Col>
                <Col style={{ width: '10%' }}></Col>
                <Col style={{ width: '40%' }}>
                  {handleRenderForm(secondColInput, changeInforInputName)}
                </Col>
              </Row>
            </Form>
          </Row>
          <Row>
            <Col style={{ width: '20%' }} />
            <Col style={{ width: '60%' }}>
              <Button type='primary' onClick={handleSubmit}>
                Save Data
              </Button>
            </Col>
            <Col style={{ width: '20%' }} />
          </Row>
        </div>
      </Modal>
      {USER_DETAILS.permission === USER_ROLE.CUSTOMER && (
        <Table dataSource={currentOrders} columns={customersColumns} />
      )}
    </div>
  );
};
