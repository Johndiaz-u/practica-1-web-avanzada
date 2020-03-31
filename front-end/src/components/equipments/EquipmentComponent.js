import React, { Component } from 'react'
import { Card, Table, Icon, Button, Form, Input, Col, Row, InputNumber, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const columns = props => [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: props.name,
    dataIndex: 'name'
  },
  {
    title: props.fee,
    dataIndex: 'fee'
  },
  {
    title: props.active,
    dataIndex: 'active',
    render: (data) => data === true ? <Icon type="check-circle" theme="twoTone" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" />
  },
  {
    title: props.family,
    dataIndex: 'family',
    render: (data) => (<span>{data.name}</span>)
  },
  // {
  //   title: props.action,
  //   dataIndex: 'equipment',
  //   render: (data) => (<ButtonGroup><Button type="primary"><Icon type="edit" /></Button><Button type="danger"><Icon type="delete" /></Button></ButtonGroup>)
  // }
]




class EquipmentComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAdd: false,
      familiesOptions: [],
    }
  }

  switchChange = () => {
    this.setState({
      isAdd: !this.state.isAdd
    })
  }

  onSubmitEquipment = () => {
    this.props.onSubmit();
    this.switchChange();
  }

  flatten = (subfamilies, extractChildren, level, parent) => Array.prototype.concat.apply(
    subfamilies.map(x => ({ ...x, level: level || 1, parent: parent || null })),
    subfamilies.map(x => this.flatten(extractChildren(x) || [], extractChildren, (level || 1) + 1, x.id))
  );

  extractChildren = x => x.subfamilies;

  componentWillReceiveProps(props) {
    if (props.families.length > 0) {
      let families = { subfamilies: props.families }
      let options = this.flatten(this.extractChildren(families), this.extractChildren).map(x => delete x.subfamilies && x);
      this.setState({ treeData: props.families, familiesOptions: options })
    }
  }

  render() {

    const { equipments, language, onChangeEquipment, onChangeEquipmentFamilyId, onSubmit } = this.props;
    const { getFieldDecorator } = this.props.form;

    const data = equipments.map((e, i) => {
      return {
        key: i,
        id: `${e.id}`,
        name: `${e.name}`,
        fee: `${e.fee}`,
        active: e.active,
        family: e.family,
        equipment: e
      }
    })

    return (
      <React.Fragment>
        {
          !this.state.isAdd ? <Card title={language.equipmentsLists}
            extra={this.props.userLogged != undefined && (this.props.userLogged.authorities[0].authority === "ROLE_ADMIN" ||
              (this.props.userLogged.authorities.length > 1 && this.props.userLogged.authorities[1].authority === "ROLE_ADMIN")) ?
              <Button type="primary" size={`large`} onClick={this.switchChange}><Icon type="plus-circle" /></Button> : null}>
            <Table scroll={{ x: 1200 }} columns={columns(language)} dataSource={data} />
          </Card> : <Card title={language.equipmentsAdd} extra={<Button type="primary" size={`large`} onClick={this.switchChange}><Icon type="rollback" /></Button>}>
              <Form hideRequiredMark style={{ marginTop: 8 }}>
                <Form.Item label={`${language.equipmentNameLabel}`}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: `${language.equipmentsNameValidation}` }],
                  })(
                    <Input prefix={<Icon type="appstore" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" onChange={onChangeEquipment} />
                  )}
                </Form.Item>
                <Form.Item label={`${language.equipmentFeeLabel}`}>
                  {getFieldDecorator('fee', {
                    rules: [{ required: true, message: `${language.equipmentsNameValidation}` }],
                  })(
                    <Input style={{ 'width': '100%' }} parser={value => value.replace(/\$\s?|(,*)/g, '')} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} name="fee" onChange={onChangeEquipment} />
                  )}
                </Form.Item>
                <Form.Item label={language.family}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a parent"
                    optionFilterProp="children"
                    onChange={onChangeEquipmentFamilyId}
                    name='familyId'
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.familiesOptions.map(fam => {
                      return (
                        <Select.Option value={fam.id}>{fam.name}</Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                <FormItem style={{ marginTop: 32 }}>
                  <Button type="primary" onClick={this.onSubmitEquipment}>
                    {`${language.add}`}
                  </Button>
                </FormItem>
              </Form>
            </Card>
        }
      </React.Fragment>
    )
  }
}

const WrappedEquipmentComponent = Form.create({ name: 'addEquipment' })(EquipmentComponent)


export default WrappedEquipmentComponent;
