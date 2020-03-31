import React, { Component } from 'react'
import { HeaderDropdown, HeaderSearch } from 'ant-design-pro';
import styles from './index.module.less';
import { Avatar } from 'antd';

export default class RightContent extends Component {
  render() {

    let { menu, userLogged } = this.props;

    let className = styles.right;
    return (
      <div className={className}>
        <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              src={userLogged.photo || userLogged.photo}
              alt="avatar"
            />
            {userLogged ? <span className={styles.name}>{userLogged.name}</span> : null}
          </span>

        </HeaderDropdown>
      </div>
    )
  }
}
