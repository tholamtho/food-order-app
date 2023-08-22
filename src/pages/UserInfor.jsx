import { Avatar, Card, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  StarFilled,
  StarOutlined,
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
              <Avatar src='https://scontent-xsp1-1.xx.fbcdn.net/v/t1.18169-9/15726431_128651384298117_6174205444485405726_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=bjsaxiWx4zAAX-Jx641&_nc_ht=scontent-xsp1-1.xx&oh=00_AfDtN5Ec3mHnaYJ1mTQfbmMBYZyJ2fHLKpZPHChyN9-B5w&oe=650C292A' />
            }
            title={info.userName ? info.userName : 'Shipper'}
            description='Đm wibu'
          />
          <div style={{ marginTop: 16 }}>
            <StarFilled style={{ color: '#FFF700' }} />
            <StarOutlined style={{ color: '#FFF700' }} />
            <StarOutlined style={{ color: '#FFF700' }} />
            <StarOutlined style={{ color: '#FFF700' }} />
            <StarOutlined style={{ color: '#FFF700' }} />
          </div>
          <div style={{ marginTop: 16 }}>Additional Infor</div>
        </Skeleton>
      </Card>
    </div>
  );
};
