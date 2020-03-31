import React, { Component } from 'react'
import { Table, Popconfirm, Button, Icon, Card } from 'antd';

export default class UsersComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  render() {
    const { getUser, getUserEdit, language } = this.props;
    const data = this.props.users.map((u, i) => {
      return {
        key: i,
        id: `${u.id}`,
        name: `${u.name}`,
        username: `${u.username}`,
        email: `${u.email}`,
        user: u,
      }
    });

    const columns = [
      {
        title: `${language.id}`,
        dataIndex: 'id'
      },
      {
        title: `${language.user}`,
        dataIndex: 'name'
      },
      {
        title: `${language.username}`,
        dataIndex: 'username'
      },
      {
        title: `${language.email}`,
        dataIndex: 'email'
      },
      {
        title: `${language.action}`,
        dataIndex: 'user',
        render: (data) => <React.Fragment>
          <Button style={{ 'marginRight': '10px' }} type="primary" shape="circle" onClick={() => getUser(data.id)}><Icon type="user" /></Button>
          <Popconfirm title="Are you sure remove this user?">
            <Button style={{ 'marginRight': '10px' }} type="danger" shape="circle"><Icon type="delete" /></Button>
          </Popconfirm>
        </React.Fragment>
      }
    ];

    return (
      <Card title={language.list_users}>
        <Table
          bordered
          scroll={{ x: 1200 }}
          columns={columns}
          dataSource={data} />
      </Card>
    )
  }
}
