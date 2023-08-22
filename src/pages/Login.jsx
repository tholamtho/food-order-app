import { Button, Form, Modal, Input } from 'antd';
import { useState } from 'react';
export const Login = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
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
    setIsOpenLogin((current) => !current);
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
      const arr = [
        ...JSON.parse(currentAccountList),
        {
          userName: registerFormInstance.getFieldValue('register-userName'),
          password: registerFormInstance.getFieldValue('register-pwd'),
        },
      ];
      console.log(arr);
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
    <div>
      <div>Login</div>
      <Button onClick={() => setIsOpenLogin((current) => !current)}>
        Login
      </Button>
      <Button onClick={() => setOpenRegister((current) => !current)}>
        Register
      </Button>
      <Modal
        open={isOpenLogin}
        title={'Login'}
        onCancel={() => setIsOpenLogin((current) => !current)}
        onOk={handleLoginSubmit}
      >
        <Form form={loginFormInstance}>
          <Form.Item name={'login-userName'} label={'UserName'}>
            <Input />
          </Form.Item>
          <Form.Item name={'login-pwd'} label={'Password'}>
            <Input type='password' />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isOpenRegister}
        title={'Login'}
        onCancel={() => setOpenRegister((current) => !current)}
        onOk={handleRegisterSubmit}
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
    </div>
  );
};
