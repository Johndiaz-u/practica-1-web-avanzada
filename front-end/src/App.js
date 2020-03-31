import React, { Component } from 'react';
import { Layout, Icon, Menu, Avatar, Dropdown, Badge, Drawer } from 'antd';
import './App.css';
import './index.css';
import Sidebar from './components/sider/Sidebar';
import { Route, Link, withRouter, Switch } from "react-router-dom";
import { meUser, fetchLanguage } from './actions/action';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { connect } from 'react-redux';
import DrawerComponent from './components/drawer/DrawerComponent';
import generalMenu from './config/menuConfig';
import RightContent from './components/RightContent/RightContent';
import AppContainer from './container/AppContainer';

const { Header, Content } = Layout;

class App extends Component {

  componentWillMount() {
    this.props.getUserLogged();
    this.props.getLanguage();
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }


  state = {
    isMobile: false,
    collapsed: false,
    visible: false,
    userLogged: {}
  };

  toggle = (state) => {
    this.setState({
      collapsed: state,
    });
  }

  onShowDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const menu = () => {
      return (
        <Menu>
          <Menu.Item>
            <span>{this.props.userLogged ? this.props.userLogged.name : null}</span>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/me`}>My profile</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/logout`}>Logout</Link>
          </Menu.Item>
        </Menu>
      )
    };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {!this.state.isMobile ? this.props.userLogged ? <Sidebar toggle={this.toggle} language={this.props.language} collapsed={this.state.collapsed} menu={generalMenu} userLogged={this.props.userLogged} mode="inline" defaultSelectKeys="1" /> : <DrawerComponent language={this.props.language} menu={generalMenu} userLogged={this.props.userLogged} visible={this.state.visible} onClose={this.onClose} closable={false} /> : null}
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.state.isMobile ? this.onShowDrawer : () => this.toggle(!this.state.collapsed)}
            />
            {this.props.userLogged ? <RightContent userLogged={this.props.userLogged} menu={menu} /> : null}
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ minHeight: 360 }}>
              <AppContainer />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLogged: state.users.userLogin,
    language: state.language.getAllTexts,
  }
}

const mapDispatchToProps = (dispatch) => {
  var userLang = navigator.language || navigator.userLanguage;
  return {
    getLanguage: () => dispatch(fetchLanguage(userLang)),
    getUserLogged: () => dispatch(meUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
