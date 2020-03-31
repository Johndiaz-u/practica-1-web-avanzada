import React, { Component } from 'react'
import { List, Button, Card, Table, Icon, Popconfirm } from 'antd';

export default class AdminComponent extends Component {
    render() {
        const { userData, onChangeAdmin, onDeleteUser } = this.props;

        const columns = [
            {
                title: 'User',
                dataIndex: 'name'
            },
            {
                title: 'e-mail',
                dataIndex: 'email'
            },
            {
                title: 'Action',
                dataIndex: 'user',
                render: (data) => <React.Fragment><Popconfirm title="Are you sure put to administrator this user? " onConfirm={() => onChangeAdmin({ id: data.id, name: data.name, email: data.email, admin: !data.admin })}><Button style={{ 'marginRight': '10px' }} type={`${data.admin ? 'danger' : 'primary'}`}><Icon type="check-circle" /></Button></Popconfirm> <Popconfirm title="Are you sure put to administrator this user? " onConfirm={() => onDeleteUser({ id: data.id, name: data.name, email: data.email, admin: !data.admin })}><Button style={{ 'marginRight': '10px' }} type="danger"><Icon type="delete" /></Button></Popconfirm></React.Fragment>
            }
        ];
        return (<Card>
            <Table bordered
                scroll={{ x: 600 }}
                dataSource={userData}
                columns={columns} />
        </Card>
        )
    }
}
