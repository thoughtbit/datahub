import React from 'react';

import {
  Layout,
  Menu,
  Tooltip,
  Icon,
  Avatar,
  Popover,
} from 'antd';

import {
  FormattedMessage,
} from 'react-intl';

import SelectHub from '../SelectHub';

import './header.less';

const Header = Layout.Header;

export default ({ pageConfig, context }) => {
  const headerUserName = (<div className="user-info clearfix"><span className="user-info-name">moocss</span></div>);
  const headerUserMenu = (
    <Menu className="menu">
      <Menu.Item key="userinfo">
        <Icon type="setting" />
        <FormattedMessage id="menu.account.settings" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        <FormattedMessage id="menu.account.logout" />
      </Menu.Item>
    </Menu>
  );
  const headerNewMenu = (
    <Menu className="menu">
      <Menu.Item key="project">
        <FormattedMessage id="menu.new.project" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="data">
        <FormattedMessage id="menu.new.data" />
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="header">
      <h1 className="logo">
        <a href="/" className="title-con">
          <span className="title">DataHub</span>
        </a>
      </h1>
      <div className="header-nav header-nav-left">
        {
          pageConfig.pageId === 'project' && <SelectHub
            allProjects={context.allProjects}
            projectName={context.projectName}
          />
        }
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1"><a href={'/dashboard'}>项目管理</a></Menu.Item>
          <Menu.Item key="2">数据管理</Menu.Item>
        </Menu>
      </div>
      <div className="header-nav header-nav-right">
        <ul className="nav">
          <li>
            <Popover placement="bottomRight" className="popover-header-user" title={headerUserName} content={headerUserMenu}>
              <div className="header-user">
                <Avatar size="small" icon="user" className="avatar" alt="avatar" />
                <Icon type="down" style={{ fontSize: '10px' }} />
              </div>
            </Popover>
          </li>
          <li>
            <Popover placement="bottomRight" className="popover-header-new" content={headerNewMenu}>
              <div className="header-new">
                <Icon type="plus-circle" style={{ fontSize: '24px', color: '#08c' }} />
              </div>
            </Popover>
          </li>
        </ul>
      </div>
    </Header>
  );
};
