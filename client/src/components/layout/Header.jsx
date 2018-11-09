import React from 'react';
import GitHubButton from 'react-github-button';

import {
  Layout,
  Tooltip,
} from 'antd';

import SelectHub from '../SelectHub';

import './header.less';

const Header = Layout.Header;

export default ({ pageConfig, context }) => {
  return (
    <Header className="header">
      <a href="/" className="title-con">
        <img src="//0.0.0.0:9200/public/logo/logo-color.svg" />
        <span className="title">DataHub</span>
      </a>
      {
        pageConfig.pageId === 'project' && <SelectHub
          allProjects={context.allProjects}
          projectName={context.projectName}
        />
      }
      <ul className="nav">
        <li className="portrait">
          <Tooltip placement="bottom" title={'hi Macaca!'}>
            <a className="mask">
              admin
            </a>
          </Tooltip>
        </li>
      </ul>
    </Header>
  );
};
