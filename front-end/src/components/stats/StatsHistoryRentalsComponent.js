import React, { Component } from 'react'
import { Card, Input, Form, Select, Table, Row, Col, Button, Collapse, Icon } from 'antd';
import moment, { lang } from 'moment';


export default class StatsHistoryRentalsComponent extends Component {

  render() {
    const { onChange, rentals, language, onSubmitRentals } = this.props;

    const columnsEquipments = [
      {
        title: language.equipment, dataIndex: 'equipment', key: 'equipment',
        render: text => <a>{text}</a>,
      },
      {
        title: language.quantity, dataIndex: 'quantity', key: 'quantity',
        render: n => <a>{n}</a>,
      },
      {
        title: language.fee, dataIndex: 'fee', key: 'fee',
        render: n => <a>{n}</a>,
      },
      {
        title: language.family, dataIndex: 'family', key: 'family',
        render: n => <a>{n}</a>,
      },
      {
        title: language.returned, dataIndex: 'returned', key: 'returned',
        render: text => <a>{text}</a>,
      }
    ]

    const columnsRentals = [
      {
        title: '#', dataIndex: 'num', key: 'num',
        render: i => <a>{i}</a>,
      },
      {
        title: language.date, dataIndex: 'date', key: 'date',
        render: text => <a>{text}</a>,
      },
      {
        title: language.delivery_date, dataIndex: 'delivery_date', key: 'delivery_date',
        render: text => <a>{text}</a>,
      },
      {
        title: language.return_status, dataIndex: 'return_status', key: 'return_status',
        render: text => <a>{text}</a>,
      },
      {
        title: language.rentals, dataIndex: 'rentals', key: 'rentals',
        render: i => <Collapse>
          {rentals.length > 0 ? (
            <Collapse.Panel header={`${rentals[i].equipmentRental.length} ${language.rentals}`} key={i}>
              <Table columns={columnsEquipments}
                dataSource={rentals[i].equipmentRental.map(e => {
                  return {
                    equipment: e.equipment.name,
                    quantity: e.quantity,
                    fee: e.equipment.fee,
                    family: e.equipment.family.name,
                    returned: e.returned === true ? language.yes : language.no,
                  }
                })
                } />
            </Collapse.Panel>
          ) : null}
        </Collapse>,
      }
    ]

    const columnsNewEquipments = [
      {
        title: '#', dataIndex: 'num', key: 'num',
        render: i => <a>{i}</a>,
      },
      {
        title: language.equipment, dataIndex: 'equipment', key: 'equipment',
        render: text => <a>{text}</a>,
      },
      {
        title: language.quantity, dataIndex: 'quantity', key: 'quantity',
        render: n => <a>{n}</a>,
      },
      {
        title: language.family, dataIndex: 'family', key: 'family',
        render: n => <a>{n}</a>,
      },
      {
        title: language.fee, dataIndex: 'fee', key: 'fee',
        render: n => <a>{n}</a>,
      },
      {
        title: language.sub_total, dataIndex: 'sub_total', key: 'sub_total',
        render: text => <a>{text}</a>,
      },
      {
        title: language.action, dataIndex: 'action', key: 'action',
        render: i => <a>{<Button type="primary" shape="circle" type="danger" icon="delete" onClick={() => this.removeEquipmentRental(i)} />}</a>,
      },
    ]

    return (
      <React.Fragment>
        <Row gutter={24} style={{ marginBottom: '10px' }}>
          <Col lg={24} md={12}>
            <Card title={language.history_rentals}>
              <Form.Item>
                <Select placeholder={language.select_client} style={{ width: 200 }} onChange={onChange}>
                  {
                    this.props.clients.length > 0 ? this.props.clients.map((c, i) => {
                      return (
                        <Select.Option key={c.id}>{`${c.firstName} ${c.lastName}`}</Select.Option>
                      )
                    }) : null
                  }
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={onSubmitRentals}>{language.submit}</Button>
              </Form.Item>

            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col>
            <Card title={language.historial}>
              {rentals.length > 0 ? (
                <Table columns={columnsRentals}
                  dataSource={rentals.map((r, i) => {
                    return {
                      num: i + 1, date: moment(r.date).format('DD-MM-YYYY'), delivery_date: moment(r.dateDelivery).format('DD-MM-YYYY'),
                      return_status: r.returned === true ? language.yes : language.no, rentals: i
                    }
                  })}
                  bordered scroll={{ x: 1200 }}
                />
              ) : null}
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
