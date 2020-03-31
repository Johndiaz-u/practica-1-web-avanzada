import React, { Component } from 'react'
import { Drawer, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { subMenuConst } from '../../config/menuConfig';

const { SubMenu } = Menu;

const subMenuExample = (onClose, language) => {
  const menu = subMenuConst(language).map(e => (
    <SubMenu
      key={e.id}
      title={<span><Icon type={e.icon} />{e.name}</span>}>
      {e.menu.map((m, index) => (
        <Menu.Item key={m.id}>
          <Icon type={m.icon} />
          <span>{m.name}</span>
          <Link to={`${m.href}`} onClick={onClose} />
        </Menu.Item>
      ))}
    </SubMenu>
  ))

  return menu;
};

class DrawerComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'closed': false,
    }
  }

  render() {

    const { defaultSelectKeys, menu, mode, onClose, visible, placement, language } = this.props;

    return (
      <Drawer visible={visible} onClose={onClose} closable={false} placement="left">
        <div className="logo" />
        <Menu defaultSelectedKeys={[`${defaultSelectKeys}`]} mode={mode}>
          {menu(language).map(e => {
            return (
              <Menu.Item key={e.id}>
                <Icon type={e.icon} />
                <span>{e.name}</span>
                <Link to={`${e.href}`} onClick={onClose} />
              </Menu.Item>
            )
          })}
          {subMenuExample(onClose, language)}

        </Menu>
      </Drawer>
    )
  }
}

export default DrawerComponent;
