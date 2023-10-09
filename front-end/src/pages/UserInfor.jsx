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
} from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { isEmpty } from 'lodash';
import { EditOutlined, StarFilled } from '@ant-design/icons';
import './UserInfor.scss';

const fakeUserInfo = {
  name: 'Another wibu',
  email: 'a@example.com',
  address: '',
  phoneNo: '0123456789',
  avatarLink:
    'https://i.pinimg.com/564x/b6/74/44/b67444cabdb5aaadb6735e75df1bcc5c.jpg',
};

const changeInforInputName = {
  name: 'name',
  email: 'email',
  phoneNo: 'phoneNo',
  dateOfBirth: 'dateOfBirth',
  address: 'address',
  password: 'password',
};
const firstColInput = [
  changeInforInputName.name,
  changeInforInputName.phoneNo,
  changeInforInputName.address,
];
const secondColInput = [
  changeInforInputName.email,
  changeInforInputName.dateOfBirth,
  changeInforInputName.password,
];

export const UserInfor = (info) => {
  const { Meta } = Card;
  const [loading, setLoading] = useState(true);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const currentData = useRef(fakeUserInfo);
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
    //Submit form
    handleCloseEditModal();
  };

  const handleRenderForm = (inputFields, data) => {
    return inputFields.map((item) => {
      console.log(Object.values(item));
      return (
        <Form.Item name={data[item]}>
          <Input placeholder={data[item]} />
        </Form.Item>
      );
    });
  };

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
            <Form>
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
    </div>
  );
};
