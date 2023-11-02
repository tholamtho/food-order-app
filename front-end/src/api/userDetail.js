import { request } from '.';

export const changeUserDetails = (payload) =>
  request.post('/update-user', { ...payload }).then((data) => {
    return data;
  });

export const getListUser = () =>
  request.get('/list-user').then((data) => {
    return data;
  });
