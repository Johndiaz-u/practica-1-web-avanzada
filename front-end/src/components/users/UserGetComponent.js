import React, { Component } from 'react'
import { Card, Button, Icon, Avatar, Col, Row } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

export default class UserGetComponent extends Component {
  render() {
    const { user, history } = this.props;
    // console.log(history);
    return (
      <React.Fragment>
        {user ? <Row gutter={24} style={{ marginBottom: '20px' }}>
          <Col className="gutter-now" lg={12} md={12} style={{ marginBottom: '20px' }}>
            <Card title={`Information`} extra={<ButtonGroup><Button type="primary" onClick={() => history.goBack()}><Icon type="rollback" /></Button><Button type="ghost" onClick={() => history.push({ pathname: `/users/${user.id}/edit`, state: { userEdit: user } })}><Icon type="edit" /></Button></ButtonGroup>}>
              <React.Fragment>
                <Avatar size={64} src={user.client.photo || user.photo} />
                <p><b>ID:</b> {user.id}</p>
                <p><b>Nombre: </b> {user.username}</p>
                <p><b>Usuario: </b>{user.username}</p>
                <p><b>E-mail: </b>{user.email}</p>
              </React.Fragment>
            </Card>
          </Col>
          <Col lg={12} md={12} style={{ marginBottom: '20px' }}>
            <Card title="Cliente">
              <p><b>Cedula:</b> {user.client.cedula}</p>
              <p><b>Nombre: </b> {user.client.firstName}</p>
              <p><b>Usuario: </b>{user.client.lastName}</p>
              <p><b>Cantidad Rentados: </b>{user.client.rentals.length}</p>
            </Card>
          </Col>
        </Row> : null}

        {/* <Row gutter={24}>
          <Col>
            <Card title="Alquilados">
              client
          </Card>
          </Col>
        </Row> */}

      </React.Fragment>


    )
  }
}
