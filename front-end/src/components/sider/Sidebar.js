import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.less';
import { subMenuConst } from '../../config/menuConfig';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const siderClassName = classNames(styles.sider, {
  [styles.fixSiderBar]: false,
  [styles.light]: false,
});

const subMenuExample = (language, userLogged) => {
  const menu = subMenuConst(language, userLogged).map(e => (
    <SubMenu
      key={e.id}
      title={<span><Icon type={e.icon} />{e.name}</span>}>
      {e.menu.map((m, index) => (
        <Menu.Item key={m.id}>
          <Icon type={m.icon} />
          <span>{m.name}</span>
          <Link to={`${m.href}`} />
        </Menu.Item>
      ))}
    </SubMenu>
  ))

  return menu;
};
const Sidebar = props => {
  console.log(props, 'sidebar')
  return (<Sider
    theme={`dark`}
    trigger={null}
    breakpoint="lg"
    collapsedWidth="0"
    onCollapse={(collapsed, type) => { props.toggle(collapsed) }}
    collapsed={props.collapsed}
    className={siderClassName}
    width={256}
  >
    <div className="logo" />
    <Menu theme="dark" defaultSelectedKeys={[`${props.defaultSelectKeys}`]} mode={props.mode}>
      {props.menu(props.language, props.userLogged).map(e => {
        return (
          <Menu.Item key={e.id}>
            <Icon type={e.icon} />
            <span>{e.name}</span>
            <Link to={`${e.href}`} />
          </Menu.Item>
        )
      })}
      {subMenuExample(props.language, props.userLogged)}
    </Menu>
  </Sider>
  );
}

export default Sidebar;
