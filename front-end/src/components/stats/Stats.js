import React, { Component } from 'react'
import { Form, Icon, Input, Button, DatePicker, Drawer, Divider, Table, Select, Collapse, Card, Row, Col, InputNumber, Typography, Tag } from 'antd';

export default class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateRange: null,
            clientId: null,
            sortedEquipmentsRentals: []
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.rentals.length > 0) {
            let equipmentRentals = []
            for (let i = 0; i < props.rentals.length; i++) {
                props.rentals[i].equipmentRental.map((eq, i) => {
                    equipmentRentals.push({
                        num: i + 1,
                        equipment: eq.equipment.name,
                        quantity: eq.quantity,
                        family: eq.equipment.family.name
                    })
                })
            }
            // console.log(equipmentRentals, 'equipmentRentals')
            this.setState({ sortedEquipmentsRentals: equipmentRentals })
        }

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        let { language } = this.props;

        const columns = [
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
        ]

        return (
            <div>
                <Card title={`${language.statistics}`}>
                    <Card title={`${language.not_returned_rentals}`}>
                        <Row>
                            <Col span={12}>
                                <Form.Item label={language.date_range}>
                                    <DatePicker.RangePicker onChange={(value) => this.onChange({ target: { name: 'dateRange', value: value } })} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={language.client}>
                                    <Select
                                        placeholder="Select Client"
                                        style={{ width: 200 }}
                                        onChange={(value) => this.onChange({ target: { name: 'clientId', value: value } })}>
                                        {
                                            this.props.clients.length > 0 ? this.props.clients.map((c, i) => {
                                                return (
                                                    <Select.Option key={c.id}>{`${c.firstName} ${c.lastName}`}</Select.Option>
                                                )
                                            }) : null
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Button type="primary" onClick={() => this.props.getRentalsFiltered({ id: this.state.clientId, start: this.state.dateRange[0], end: this.state.dateRange[1] })}>{language.search}</Button>
                        </Row>
                        <Row>
                            <Divider dashed />
                            {this.state.sortedEquipmentsRentals.length > 0 ? <Table scroll={{ x: 1200 }} columns={columns} dataSource={
                                this.state.sortedEquipmentsRentals.map((eq, i) => {
                                    return {
                                        num: i + 1,
                                        equipment: eq.equipment,
                                        quantity: eq.quantity,
                                        family: eq.family
                                    }
                                })
                            }
                            /> : <Typography.Text type="danger">{language.select_data}</Typography.Text>}
                        </Row>
                    </Card>                    
                </Card>
            </div>
        )
    }
}
