import { request } from '.';

export const addOrderDetail = (orderData) =>
  request.post('/update-order', { ...orderData }).then(({ data }) => {
    return data;
  });

export const getAllCustomerOrderDetail = (id) =>
  request.post('/get-orders', { ...{ customersName: id } }).then((data) => {
    return data;
  });

export const getAllShipperOrderDetail = (id) =>
  request
    .post('/get-orders-shippers', { ...{ shipperName: id } })
    .then((data) => {
      return data;
    });

export const changeOrderDetails = (payload) =>
  request.post('/update-orders', { ...payload }).then((data) => {
    return data;
  });
