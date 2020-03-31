import React, { Component } from 'react'

import { Form, Icon, Input, Button, Layout, Alert } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const AlertError = () => {
  return <Alert
    message="Error"
    description="An error has occurred"
    type="error" />
}


class Login extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors, language } = this.props;
    return (
      <Content style={{ minHeight: '100vh', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px', 'display': 'flex' }}>
        {this.props.isLoading ? <div style={{ textAlign: 'center' }}><Icon type="loading" style={{ fontSize: '64px', textAlign: 'center' }} /></div> : <Form style={{ 'borderRadius': '10px', width: '100%', maxWidth: '420px', padding: '15px', margin: 'auto' }} className="login-form" onSubmit={this.props.onSubmitLoginUser}>
          <div style={{ textAlign: 'center' }}><h1>{language.login}</h1></div>
          <Form.Item>
            {errors && errors.hasOwnProperty("hasError") ? <AlertError /> : null}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your username or e-email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="usernameOrEmail" onChange={this.props.onChangeLoginUser} placeholder={language.username_email} />
            )}
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onChange={this.props.onChangeLoginUser} name="password" placeholder={language.password} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.props.onSubmitLoginUser} className="login-form-button">{language.login_submit}</Button>
          </Form.Item>
          <Form.Item>
            <Link to="/register"><Button block type="danger">{language.login_register}</Button></Link>
          </Form.Item>

        </Form>}
      </Content>
    )
  }
}

const WrappedLogin = Form.create({ name: 'login' })(Login)

export default WrappedLogin;
