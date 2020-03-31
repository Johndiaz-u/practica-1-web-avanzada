import React, { Component } from 'react'
import { Row, Form, Input, Col, Card, Icon, Checkbox, Button } from 'antd';

const CheckboxGroup = Checkbox.Group;

const setDefault = (props, data) => {
  props.setFieldsValue(data);
}

class UserEditComponent extends Component {

  onChange = (checkedValues) => {
    this.props.onChangeRoles(checkedValues);
  }
  render() {

    const rolesOptions = [
      { label: 'ADMIN', value: 'ROLE_ADMIN' },
      { label: 'USER', value: 'ROLE_USER' },
    ]

    const { onChangeUserEdit, userEdit, userEditState, user } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={24}>
        <Col>
          <Card title="Edit information - Client">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your email' }],
                initialValue: user.name
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" onChange={onChangeUserEdit} />
              )}
            </Form.Item>
            <Form.Item label="ROLES">
              <CheckboxGroup options={rolesOptions} defaultValue={user.roles} onChange={this.onChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={this.props.onSubmitUserEdit}>Edit</Button>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    )
  }
}


const WrappedUserEditComponent = Form.create({ name: 'userEdit' })(UserEditComponent)

export default WrappedUserEditComponent;
