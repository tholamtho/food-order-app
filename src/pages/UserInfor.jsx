import { Avatar, Card, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  StarFilled,
} from '@ant-design/icons';

export const UserInfor = (info) => {
  const { Meta } = Card;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className='user-infor-container'>
      UserInfor
      <Card
        style={{ width: window.innerWidth, marginTop: 16 }}
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />
            }
            title={info.userName ? info.userName : 'Shipper'}
            description='Nhân viên giao hàng'
          />
          <div style={{ marginTop: 16 }}>
            <StarFilled style={{ color: '#FFF700' }} />
            <StarFilled style={{ color: '#FFF700' }} />
            <StarFilled style={{ color: '#FFF700' }} />
            <StarFilled style={{ color: '#FFF700' }} />
            <StarFilled style={{ color: '#FFF700' }} />
          </div>
          <div style={{ marginTop: 16 }}>Thông tin thêm</div>
        </Skeleton>
      </Card>
    </div>
  );
};
