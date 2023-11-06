import { Button, Form, Modal, Input, Row, Col, Select } from 'antd';
import { useState } from 'react';
import './Login.scss';
import { loginWithAccount, registerAccount } from '../api/login';
export const Login = () => {
  const [isOpenRegister, setOpenRegister] = useState(false);
  const [loginFormInstance] = Form.useForm();
  const [registerFormInstance] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [createPasswordVisible, setCreatePasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const userRoleOptions = [
    { label: 'A customer', value: 2 },
    { label: 'A delivery man', value: 3 },
  ];

  const handleLoginSubmit = async () => {
    const loginData = await loginWithAccount({
      username: loginFormInstance.getFieldValue('login-userName'),
      password: loginFormInstance.getFieldValue('login-pwd'),
    });
    if (loginData.username && loginData.permission !== -1) {
      localStorage.setItem('isLogined', 'true');
      localStorage.setItem(
        'userName',
        loginFormInstance.getFieldValue('login-userName')
      );
      localStorage.setItem('user_info', JSON.stringify(loginData));
      window.location.pathname = '/home';
    } else {
      alert('The information is not correct. Please try again!');
    }
  };
  const handleRegisterSubmit = async () => {
    registerFormInstance
      .validateFields()
      .then(async () => {
        if (
          registerFormInstance.getFieldValue('register-pwd') !==
          registerFormInstance.getFieldValue('register-confirm-pwd')
        ) {
          alert('Password must same as Confirm Password');
          setOpenRegister((current) => !current);
          return;
        }

        const registerStatus = await registerAccount({
          username: registerFormInstance.getFieldValue('register-userName'),
          password: registerFormInstance.getFieldValue('register-pwd'),
          email: registerFormInstance.getFieldValue('register-email'),
          phoneNo: registerFormInstance.getFieldValue('register-phoneNo'),
          userAddress: registerFormInstance.getFieldValue('user-address'),
          permission:
            Number(registerFormInstance.getFieldValue('role-select')) ?? 2,
        });
        if (!registerStatus) {
          alert('Tài khoản đã được tạo!');
          return;
        }
        setOpenRegister((current) => !current);
      })
      .catch(() => {
        console.log('catch');
        return;
      });
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
            <h2>Login</h2>
            <Form form={loginFormInstance}>
              <Row>
                <Col className='label-input'>
                  <span>Username</span>
                </Col>
                <Col className='input-login'>
                  <Form.Item
                    name={'login-userName'}
                    rules={[
                      {
                        required: true,
                        message: 'Please input username',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className='label-input'>
                  <span>Password</span>
                </Col>
                <Col className='input-login'>
                  <Form.Item
                    name={'login-pwd'}
                    rules={[
                      {
                        required: true,
                        message: 'Please input Password',
                      },
                    ]}
                  >
                    <Input.Password
                      visibilityToggle={{
                        visible: passwordVisible,
                        onVisibleChange: setPasswordVisible,
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Button onClick={handleLoginSubmit} type='primary'>
                  Login
                </Button>
              </Row>
              <Row className='regis-btn'>
                <Button onClick={() => setOpenRegister((current) => !current)}>
                  Not have account? Register now.
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
            <Form.Item
              name={'register-userName'}
              label={'UserName'}
              rules={[
                {
                  required: true,
                  message: 'Please input username',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'register-email'}
              label={'Email'}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'register-phoneNo'}
              label={'Phone Number'}
              rules={[
                {
                  required: true,
                  message: 'Please input phone number',
                },
              ]}
            >
              <Input type='number' />
            </Form.Item>
            <Form.Item
              name={'register-pwd'}
              label={'Password'}
              rules={[
                {
                  required: true,
                  message: 'Please input Password',
                },
              ]}
            >
              <Input.Password
                visibilityToggle={{
                  visible: createPasswordVisible,
                  onVisibleChange: setCreatePasswordVisible,
                }}
              />
            </Form.Item>
            <Form.Item
              name={'register-confirm-pwd'}
              label={'Confirm Password'}
              rules={[
                {
                  required: true,
                  message: 'Please input confirm password',
                },
              ]}
            >
              <Input.Password
                visibilityToggle={{
                  visible: confirmPasswordVisible,
                  onVisibleChange: setConfirmPasswordVisible,
                }}
              />
            </Form.Item>
            <Form.Item
              name={'user-address'}
              label={'Address'}
              rules={[
                {
                  required: true,
                  message: 'Please input address',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'role-select'}
              label={'You are'}
              rules={[
                {
                  required: true,
                  message: 'Please select your roles',
                },
              ]}
            >
              <Select options={userRoleOptions} />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};
