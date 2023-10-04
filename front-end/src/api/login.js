import { request } from '.';

export const registerAccount = (loginData) =>
  request.post('/register-account', { ...loginData }).then(({ data }) => data);
