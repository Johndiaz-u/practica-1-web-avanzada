import React, { Component } from 'react'
import { Form, Icon, Input, Button, Layout, Alert, Table, Divider, Collapse, Card } from 'antd';
import { Link } from 'react-router-dom';
import moment, { lang } from 'moment';

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewClient: false
    }
  }

  componentDidMount() {
    // var userLang = navigator.language || navigator.userLanguage;
    // alert("The language is: " + userLang);
  }

  render() {
    let { language } = this.props;

    const columnsClients = [
      {
        title: '#', dataIndex: 'num', key: 'num',
        render: i => <a>{i}</a>,
      },
      {
        title: language.name, dataIndex: 'name', key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: language.username, dataIndex: 'username', key: 'username',
        render: text => <a>{text}</a>,
      },
      {
        title: language.email, dataIndex: 'email', key: 'email',
        render: text => <a>{text}</a>,
      },
      {
        title: language.rentals, dataIndex: 'total_rentals', key: 'total_rentals',
        render: text => <a>{text}</a>,
      },
      {
        title: language.action, dataIndex: 'action', key: 'action',
        render: i => <Button type="primary" shape="circle" icon="file-text" onClick={() => this.setState({ viewClient: i })} />,
      },
    ]

    const data = this.props.clients.length > 0 ? this.props.clients.map((c, i) => {
      return {
        key: '1',
        num: i + 1,
        name: `${c.firstName} ${c.lastName}`,
        username: c.user.username,
        email: c.user.email,
        total_rentals: c.rentals.length,
        action: i
      }
    }) : []

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
      },
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
          <Collapse.Panel header={`${this.props.clients[this.state.viewClient].rentals[i].equipmentRental.length} ${language.rentals}`} key={i}>
            <Table columns={columnsEquipments}
              dataSource={
                this.props.clients[this.state.viewClient].rentals[i].equipmentRental.map(e => {
                  return {
                    equipment: e.equipment.name,
                    quantity: e.quantity,
                    fee: e.equipment.fee,
                    family: e.equipment.family.name,
                    returned: e.returned === true ? language.yes : language.no
                  }
                })
              } />
          </Collapse.Panel>
        </Collapse>,
      },
    ]

    return (
      <div>
        {
          this.state.viewClient === false ? (
            <Card title={language.clients_title}>
              <Table columns={columnsClients} dataSource={data} bordered scroll={{ x: 1200 }} />
            </Card>
          ) :
            (
              <Card title={`${language.client}: ${this.props.clients[this.state.viewClient].firstName} ${this.props.clients[this.state.viewClient].lastName}`}
                extra={<Button onClick={() => this.setState({ viewClient: false })}>{language.back}</Button>}>
                <Table columns={columnsRentals}
                  dataSource={this.props.clients[this.state.viewClient].rentals.map((r, i) => {
                    return {
                      num: i + 1, date: moment(r.date).format('DD-MM-YYYY'), delivery_date: moment(r.dateDelivery).format('DD-MM-YYYY'),
                      return_status: r.returned === true ? language.yes : language.no, rentals: i
                    }
                  })}
                  bordered scroll={{ x: 1200 }}
                />
              </Card>
            )
        }

      </div>
    )
  }
}

export default Clients;
