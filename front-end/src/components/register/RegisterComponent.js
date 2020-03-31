import React, { Component } from 'react';

import { Form, Icon, Input, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { lang } from 'moment';


const { Content } = Layout;


export default class RegisterComponent extends Component {
  render() {
    const { onChangeRegister, language } = this.props;
    return (
      <Content style={{ minHeight: '100vh', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px', 'display': 'flex' }}>
        <Form style={{ width: '100%', maxWidth: '420px', padding: '15px', margin: 'auto' }} className="login-form" autoComplete="false">
          <div style={{ textAlign: 'center' }}><h2>{language.sign_up}</h2></div>
          <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={language.name} name="name" onChange={this.props.onChangeRegister} autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={language.lastName} name="lastName" onChange={this.props.onChangeRegister} autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={language.id} name="cedula" onChange={this.props.onChangeRegister} autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={language.username} name="username" onChange={this.props.onChangeRegister} autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" onChange={this.props.onChangeRegister} placeholder={language.password} />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={language.password_repeat} />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" name="email" onChange={this.props.onChangeRegister} placeholder={language.email} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.props.onSubmitAddUser} className="login-form-button">
              {language.register_submit}
            </Button>
            <Link to={`/login`}><Button type="default" block> {language.register_back} </Button></Link>
          </Form.Item>
        </Form>
      </Content>
    )
  }
}
