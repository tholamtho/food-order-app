import { request } from '.';

export const registerAccount = (registerData) =>
  request
    .post('/register-account', { ...registerData })
    .then(({ data }) => data);

export const loginWithAccount = (loginData) =>
  request.post('/login', { ...loginData }).then(({ data }) => data);
