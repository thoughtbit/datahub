'use strict';

import React, {
  Component,
} from 'react';

import {
  Icon,
  Input,
  Upload,
  Button,
  message,
  Tooltip,
  Popconfirm,
} from 'antd';

import {
  injectIntl,
} from 'react-intl';

import InterfaceForm from './forms/InterfaceForm';

import { interfaceService } from '../service';

import './InterfaceList.less';

const projectName = window.context.projectName;

const Search = Input.Search;

class InterfaceList extends Component {
  state = {
    interfaceFormVisible: false,
    interfaceFormLoading: false,
    filterString: '',
    stageData: null,
  }

  formatMessage = id => this.props.intl.formatMessage({ id });

  showCreateForm = () => {
    this.setState({
      stageData: null,
      interfaceFormVisible: true,
    });
  }

  showUpdateForm = async value => {
    this.setState({
      stageData: value,
      interfaceFormVisible: true,
    });
  }

  closeInterfaceForm = () => {
    this.setState({
      interfaceFormVisible: false,
    });
  }

  confirmInterfaceForm = async ({ pathname, description, method }) => {
    this.setState({
      interfaceFormLoading: true,
    });
    const apiName = this.state.stageData
      ? 'updateInterface'
      : 'createInterface';
    const res = await interfaceService[apiName]({
      uniqId: this.state.stageData && this.state.stageData.uniqId,
      pathname,
      description,
      method,
    });
    this.setState({
      interfaceFormLoading: false,
    });
    if (res.success) {
      this.setState({
        interfaceFormVisible: false,
      }, () => {
        this.props.updateInterfaceList();
      });
    }
  }

  deleteInterface = async uniqId => {
    await interfaceService.deleteInterface({ uniqId });
    await this.props.updateInterfaceList();
  }

  downloadInterface = value => {
    location.href = interfaceService.getDownloadAddress({
      uniqId: value.uniqId,
    });
  }

  uploadProps = () => {
    return {
      accept: 'text',
      action: interfaceService.uploadServer,
      showUploadList: false,
      headers: {
        authorization: 'authorization-text',
      },
      onChange (info) {
        if (info.file.status === 'done') {
          if (info.file.response.success) {
            message.success(`${info.file.name} file uploaded successfully`);
            location.reload();
          } else {
            message.error(info.file.response.message);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

  filterInterface = (e) => {
    const filter = e.target.value.toLowerCase();
    this.setState({
      filterString: filter,
    });
  }

  toDocPage = () => {
    location.href = `//${location.host}/doc/${projectName}`;
  }

  toRestcPage = (value) => {
    // location.href = `//${location.host}/data/${projectName}/${value.pathname}`;
    window.open(`//${location.host}/data/${projectName}/${value.pathname}#!method=${value.method === 'ALL' ? 'GET' : value.method}`);
  }

  renderInterfaceList = () => {
    const unControlled = this.props.unControlled;
    const formatMessage = this.formatMessage;
    const { interfaceList } = this.props;
    return interfaceList.filter(value =>
      value.pathname.toLowerCase().includes(this.state.filterString) ||
      value.description.toLowerCase().includes(this.state.filterString)
    ).map((value, index) => {
      const isSelected = value.uniqId === this.props.selectedInterface.uniqId;
      return (
        <li
          key={index}
          data-accessbilityid={`project-add-api-list-${index}`}
          className={isSelected ? 'clicked' : ''}
        >
          <div className="interface-item"
            onClick={() => this.props.setSelectedInterface(value.uniqId)}>
            <h3 title={value.pathname}><strong className={'method ' + value.method}>{value.method}</strong><span className="pathname">{value.pathname}</span></h3>
            <p title={value.description}>{value.description}</p>
          </div>
          {!unControlled && <div className="interface-control" style={{fontSize: '16px'}}>
            {this.props.experimentConfig.isOpenDownloadAndUpload ? <span>
              <Upload name={ value.uniqId } {...this.uploadProps()}>
                <Icon className="upload-icon" type="upload" />
              </Upload>
              <Icon
                type="download"
                className="download-icon"
                onClick={() => this.downloadInterface(value)}
              />
            </span> : null}
            <Tooltip title={'预览场景数据'}>
              <Icon
                type="api"
                className="preview-icon"
                onClick={() => this.toRestcPage(value) }
              />
            </Tooltip>
            <Tooltip title={formatMessage('interfaceList.updateInterface')}>
              <Icon
                type="setting"
                className="setting-icon"
                onClick={() => this.showUpdateForm(value)}
              />
            </Tooltip>
            <Popconfirm
              title={formatMessage('common.deleteTip')}
              onConfirm={() => this.deleteInterface(value.uniqId)}
              okText={formatMessage('common.confirm')}
              cancelText={formatMessage('common.cancel')}
            >
              <Icon style={{color: '#f5222d'}} className="delete-icon" type="delete" />
            </Popconfirm>
          </div>}
        </li>
      );
    });
  }

  render () {
    const formatMessage = this.formatMessage;
    const unControlled = this.props.unControlled;
    const interfaceListClassNames = ['interface-list'];
    if (unControlled) interfaceListClassNames.push('uncontrolled');
    return (
      <div className={`${interfaceListClassNames.join(' ')}`}>
        <div className="interface-list-hd">
          <div className="title">
            <div className="title-label">
              <h3>{formatMessage('project.interfaceList')}</h3>
            </div>
            <div className="title-actions">
              {
                !unControlled &&
                  <ul class="actions-container">
                    <li class="action-item">
                      <Tooltip title={formatMessage('interfaceList.addInterface')}>
                        <Button
                          shape="circle"
                          data-accessbilityid="project-add-api-list-btn"
                          onClick={this.showCreateForm}
                        ><Icon type="plus-square" /></Button>
                      </Tooltip>
                    </li>
                    <li class="action-item">
                      <Tooltip title={formatMessage('topNav.documentation')}>
                        <Button
                          shape="circle"
                          onClick={this.toDocPage}
                        >
                          <Icon type="book"/>
                        </Button>
                      </Tooltip>
                    </li>
                  </ul>
              }
            </div>
          </div>
          {
            !unControlled && <div className="search-api-box"><Search
              data-accessbilityid="project-search-api"
              placeholder={formatMessage('interfaceList.searchInterface')}
              onChange={this.filterInterface}
            /></div>
          }
        </div>
        <ul className="interface-list-bd">
          { this.renderInterfaceList() }
        </ul>

        <InterfaceForm
          visible={this.state.interfaceFormVisible}
          onCancel={this.closeInterfaceForm}
          onOk={this.confirmInterfaceForm}
          confirmLoading={this.state.interfaceFormLoading}
          stageData={this.state.stageData}
        />
      </div>
    );
  }
}

export default injectIntl(InterfaceList);
