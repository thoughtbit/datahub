import React from 'react';

import {
  Layout,
  Tooltip,
  Icon,
} from 'antd';

import SelectHub from '../SelectHub';

import './header.less';

const Header = Layout.Header;

export default ({ pageConfig, context }) => {
  return (
    <Header className="header">
      <h1 className="logo">
        <a href="/" className="title-con">
          <span className="title">DataHub</span>
        </a>
      </h1>
      <div className="header-nav header-nav-left">
        {
          pageConfig.pageId === 'project' &&
          <React.Fragment>
            <Tooltip placement="bottom" title="项目列表">
              <a className="project-list-link" href={'/dashboard'}><Icon type="project" /></a>
            </Tooltip>
            <SelectHub allProjects={context.allProjects} projectName={context.projectName}/>
          </React.Fragment>
        }
      </div>
      <div className="header-nav header-nav-right"></div>
    </Header>
  );
};
