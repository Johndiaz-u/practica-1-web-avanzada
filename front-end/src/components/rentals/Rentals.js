import React, { Component } from 'react'
import { Form, Icon, Input, Button, DatePicker, Drawer, Divider, Table, Select, Collapse, Card, Row, Col, InputNumber, Typography, Tag } from 'antd';
import moment, { lang } from 'moment';
import { height } from 'window-size';

export default class Rentals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addNew: false,
      new_rental_dateDelivery: '',
      new_equipmentRental_equipmentId: '',
      new_equipmentRental_quantity: 1,
      new_rental_equipmentRentals: [],
      returnDrawer: false,
      returnEquipment: null
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  addEquipmentRental() {
    let equipmentRentals = this.state.new_rental_equipmentRentals;

    let fee = 0;
    let family = '';
    let name = '';
    this.props.equipments.some(eq => {
      if (eq.id == this.state.new_equipmentRental_equipmentId) {
        fee = eq.fee;
        family = eq.family.name;
        name = eq.name;
        return;
      }
    });

    let newEq = {
      equipmentId: this.state.new_equipmentRental_equipmentId,
      quantity: this.state.new_equipmentRental_quantity,
      family: family,
      fee: fee,
      name: name,
      sub_total: fee * this.state.new_equipmentRental_quantity
    }

    equipmentRentals.push(newEq)
    this.setState({ new_rental_equipmentRentals: equipmentRentals })
  }

  removeEquipmentRental(i) {
    let equipmentRentals = this.state.new_rental_equipmentRentals;
    equipmentRentals.splice(i, 1);
    this.setState({ new_rental_equipmentRentals: equipmentRentals })
  }

  returnEquipmentRental(i) {
    this.props.updateEquipmentRental({ id: i, returned: true, clientId: this.props.userLogged.id })
    this.setState({ returnDrawer: false, returnEquipmentRental: null })
  }

  submit() {
    let data = {
      rental: {
        returned: false,
        dateDelivery: this.state.new_rental_dateDelivery,
        clientId: this.props.userLogged.id
      },
      equipmentRentals: this.state.new_rental_equipmentRentals.map(eq => {
        return {
          equipmentId: eq.equipmentId,
          quantity: eq.quantity,
          returned: false,
          rentalId: 0
        }
      })
    }

    this.props.addRental(data);
    this.setState({ addNew: false });
  }

  render() {
    let { language } = this.props;
    let rentals = this.props.rentals;
    // console.log(rentals, 'rentals')

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
      }, {
        title: language.action, dataIndex: 'action', key: 'action',
        render: eq => <a>{eq.returned === false ? <Button type="primary" onClick={() => this.setState({ returnDrawer: eq.id, returnEquipment: eq })}>{language.return}</Button> : <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />}</a>,
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
                    action: e.returned === true ? 0 : e
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
      <div>
        {
          this.state.addNew === false ? (
            <Card title={`${language.my} ${language.rentals}`} extra={<Button type="primary" onClick={() => this.setState({ addNew: true })}>{language.new}</Button>}>
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
          ) : (
              <Card title={`${language.new} ${language.rental}`} extra={<Button onClick={() => this.setState({ addNew: false })}>{language.back}</Button>}>
                <Form>
                  <Row>
                    <Col span={12}>
                      <Form.Item label={language.delivery_date}>
                        <DatePicker name='new_rental_dateDelivery' onChange={(value) => this.onChange({ target: { name: 'new_rental_dateDelivery', value: value } })} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Card title={language.add_equipment}>
                        <Form.Item label={language.equipments}>
                          <Select
                            placeholder="Select Equipments"
                            onChange={(value) => this.onChange({ target: { name: 'new_equipmentRental_equipmentId', value: value } })}>
                            {
                              this.props.equipments.length > 0 ? this.props.equipments.map(eq => {
                                return (
                                  <Select.Option key={eq.id}>{`${eq.name} (fee = ${eq.fee})`}</Select.Option>
                                )
                              }) : null
                            }
                          </Select>
                        </Form.Item>
                        <Form.Item>
                          <InputNumber min={1} max={999} defaultValue={1} onChange={(value) => this.onChange({ target: { name: 'new_equipmentRental_quantity', value: parseInt(value) } })} />
                        </Form.Item>
                        <Button type="primary" onClick={() => this.addEquipmentRental()}>{language.add}</Button>
                      </Card>
                    </Col>
                  </Row>
                  <Divider dashed />
                  <Row>
                    <Card title={language.equipments}>
                      <Table columns={columnsNewEquipments}
                        dataSource={this.state.new_rental_equipmentRentals.map((r, i) => {
                          return {
                            num: i + 1,
                            equipment: r.name,
                            quantity: r.quantity,
                            family: r.family,
                            fee: r.fee,
                            sub_total: r.sub_total,
                            action: i
                          }
                        })}
                        bordered scroll={{ x: 1200 }}
                        footer={() => {
                          return (<div><Typography.Text strong>Total:</Typography.Text> <Tag color="blue" style={{ float: 'right' }}>{
                            this.state.new_rental_equipmentRentals.map(r => r.sub_total).reduce((a, b) => a + b, 0)
                          }</Tag></div>)
                        }} />
                    </Card>
                  </Row>
                </Form>
                <Button type="primary" className="login-form-button" onClick={() => this.submit()}>{language.submit}</Button>
              </Card>
            )
        }
        {this.state.returnEquipment != null ? (
          <Drawer
            title={`${language.return} ${language.rental}`}
            placement='bottom'
            closable={true}
            onClose={() => this.setState({ returnDrawer: false })}
            visible={this.state.returnDrawer}
            height='100%'
          >
            <Typography.Title level={4}>{language.equipment + ': '}</Typography.Title>
            <Typography.Text strong>{this.state.returnEquipment.equipment.name}</Typography.Text>
            <Divider dashed />
            <Typography.Title level={4}>{language.fee + ': '}</Typography.Title>
            <Typography.Text strong>{`$${this.state.returnEquipment.equipment.fee} * ${this.state.returnEquipment.quantity} = ${this.state.returnEquipment.equipment.fee * this.state.returnEquipment.quantity}`}</Typography.Text>
            <Divider dashed />
            <Button type="primary" onClick={() => this.returnEquipmentRental(this.state.returnEquipment.id)}>{language.return}</Button>
          </Drawer>
        ) : null}
      </div>
    )
  }
}
