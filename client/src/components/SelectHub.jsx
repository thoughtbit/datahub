'use strict';

import React, {
  PureComponent,
} from 'react';

import {
  Menu,
  Icon,
  Dropdown,
} from 'antd';

export default class SelectHub extends PureComponent {
  render () {
    if (!this.props.allProjects) {
      return null;
    }

    const list = this.props.allProjects
      .map(item => item.projectName);
    const projectName = this.props.projectName;

    if (list.length < 2) {
      return null;
    }

    const menu = (
      <Menu className="ant-dropdown-project-menu">
        {list.map((item, key) => {
          return (
            <Menu.Item key={key} data-accessbilityid={`dropdonw-list-${key}`}>
              <a href={`./${item}`}>{item}</a>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomLeft">
        <a href="javascript:;" className="ant-dropdown-link" data-accessbilityid="dropdonw-list">
          <span className="name">{ projectName }</span> <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}

