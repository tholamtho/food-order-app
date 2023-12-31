import { useEffect } from 'react';
import { changeUserDetails, getListUser } from '../api/userDetail';
import { useState } from 'react';
import { USER_ROLE } from '../components/Header/Header';
import { getListOrder } from '../api/orderDetail';
import { Button } from 'reactstrap';
import { Table } from 'antd';

export const UserManageMent = () => {
  const [listUser, setListUser] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    getListUser().then((data) => {
      setListUser(
        data.data.filter((item) => item.permission === USER_ROLE.SHIPPER)
      );
    });
    getListOrder().then((data) => {
      setListOrder(data.data.filter((item) => item.graded));
    });
  }, []);

  const handleBanningUser = (record) => {
    changeUserDetails({ ...record, banned: !record.banned });
    window.location.reload();
  };

  const tableColumns = [
    {
      title: 'Shipper Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Bad Rating Times',
      key: 'NGTimes',
      render: (_, record) => {
        return listOrder.filter(
          (item) =>
            item.shipperName === record.username && item.oderRating === 1
        ).length;
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleBanningUser(record)}>
          {record.banned ? 'Unban User' : 'Ban User'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={listUser} columns={tableColumns}></Table>
    </div>
  );
};
