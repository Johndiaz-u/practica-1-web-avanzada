import React, { Component } from 'react'
import { Row, Col, Card, Icon, Table } from 'antd';

const { Meta } = Card;

export default class MeComponent extends Component {
  render() {
    const { me, language, goToEdit } = this.props;
    if (language)
      return (
        <Row gutter={24}>
          <Col lg={12} md={12}>
            {me ? <Card
              title={language.me}
              cover={
                me.photo ? <img
                  alt="example"
                  src={me.photo}
                  width="256"
                  height="256"
                /> : null}
              actions={[<Icon type={`edit`} onClick={goToEdit} />]}
            >
              <Meta
                title={me.name}
                description={
                  <React.Fragment>
                    <p><b>{language.id}</b> {me.id}</p>
                    <p><b>{language.username}: </b> {me.username}</p>
                    {/* <p><b>{language.name}: </b>{me.name}</p> */}
                    <p><b>{language.email} </b>{me.email}</p>
                    <p><b>{language.firstName} </b>{me.client.firstName}</p>
                    <p><b>{language.lastName} </b>{me.client.lastName}</p>

                  </React.Fragment>}
              />

            </Card> : null}
          </Col>
          {me ?
            <Col lg={12} md={12}>
              <Card title={language.rentals}>
                <p><b>Cantidad Rentados: </b>{me.client.rentals.length}</p>
              </Card>
            </Col> : null}
        </Row>
      )
  }
}
