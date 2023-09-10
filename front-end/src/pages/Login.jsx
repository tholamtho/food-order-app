import { Button, Form, Modal, Input, Row, Col } from 'antd';
import { useState } from 'react';
import './Login.scss';
export const Login = () => {
  const [isOpenRegister, setOpenRegister] = useState(false);
  const [loginFormInstance] = Form.useForm();
  const [registerFormInstance] = Form.useForm();
  const accountList = localStorage.getItem('accountList');
  const handleLoginSubmit = () => {
    if (accountList) {
      const isExisted = JSON.parse(accountList ?? '').find(
        (item) =>
          item.userName === loginFormInstance.getFieldValue('login-userName') &&
          item.password === loginFormInstance.getFieldValue('login-pwd')
      );
      if (isExisted) {
        localStorage.setItem('isLogined', 'true');
        localStorage.setItem(
          'userName',
          loginFormInstance.getFieldValue('login-userName')
        );
        window.location.pathname = '/home';
      } else {
        alert('User not exits');
      }
    }
  };
  const handleRegisterSubmit = () => {
    if (
      registerFormInstance.getFieldValue('register-pwd') !==
      registerFormInstance.getFieldValue('register-confirm-pwd')
    ) {
      alert('Password must same as Confirm Password');
      setOpenRegister((current) => !current);
      return;
    }
    const currentAccountList = localStorage.getItem('accountList');
    console.log(currentAccountList, typeof currentAccountList);
    if (currentAccountList && Array.isArray(JSON.parse(currentAccountList))) {
      localStorage.setItem(
        'accountList',
        JSON.stringify([
          ...JSON.parse(currentAccountList),
          {
            userName: registerFormInstance.getFieldValue('register-userName'),
            password: registerFormInstance.getFieldValue('register-pwd'),
          },
        ])
      );
    }
    setOpenRegister((current) => !current);
  };
  return (
    <div className='login-containers'>
      <Row gutter={[8, 8]}>
        <Col className='image-col'>
          <img
            src='https://international.fpt.edu.vn/web/image/3822/gw%209.jpg?access_token=9dda13c8-8f20-468a-b97e-8b520d947675'
            width={window.innerWidth * 0.7}
            height={window.innerHeight}
            alt='school-img'
          ></img>
        </Col>
        <Col className='form-col'>
          <div className='input-fields'>
            <h2>Đăng nhập</h2>
            <Form form={loginFormInstance}>
              <Row>
                <Col className='label-input'>
                  <span>Tên đăng nhập</span>
                </Col>
                <Col className='input-login'>
                  <Form.Item name={'login-userName'}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className='label-input'>
                  <span>Mật khẩu</span>
                </Col>
                <Col className='input-login'>
                  <Form.Item name={'login-pwd'}>
                    <Input type='password' />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Button onClick={handleLoginSubmit} type='primary'>
                  Đăng nhập
                </Button>
              </Row>
              <Row className='regis-btn'>
                <Button onClick={() => setOpenRegister((current) => !current)}>
                  Chưa có account? Đăng kí
                </Button>
              </Row>
            </Form>
          </div>
        </Col>
        <Modal
          open={isOpenRegister}
          title={'Login'}
          onCancel={() => setOpenRegister((current) => !current)}
          onOk={handleRegisterSubmit}
          centered
        >
          <Form form={registerFormInstance}>
            <Form.Item name={'register-userName'} label={'UserName'}>
              <Input />
            </Form.Item>
            <Form.Item name={'register-pwd'} label={'Password'}>
              <Input type='password' />
            </Form.Item>
            <Form.Item name={'register-confirm-pwd'} label={'Confirm Password'}>
              <Input type='password' />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};
