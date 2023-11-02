import { request } from '.';

export const changeUserDetails = (payload) =>
  request.post('/update-user', { ...payload }).then((data) => {
    return data;
  });
