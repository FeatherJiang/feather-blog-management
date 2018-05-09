import React from 'react';
import PropTypes from 'prop-types';
import { Button, Upload, message, Modal, Icon, Form, Input, Select } from 'antd';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';
import config from '../../config';
import Markdown from '../../components/Markdown';
import API from '../../API';
import { GETED, CREATED } from '../../config/statusCode';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const styles = {
  write: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  editor: {
    position: 'relative',
    width: '50%',
    height: '100%',
  },
  view: {
    position: 'relative',
    width: '50%',
    overflow: 'auto',
  },
  uploadButton: {
    position: 'absolute',
    zIndex: '99999',
    top: '10px',
    right: '10px',
  },
  modalButton: {
    position: 'absolute',
    zIndex: '99999',
    top: '10px',
    right: '10px',
  },
  img: {
    width: '100px',
  },
};

class Write extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleUpload: false,
      visibleCreate: false,
      title: '',
      overview: '',
      input: '',
      imageUrl: '',
      bannerUrl: '',
      uploadLoading: false,
      createLoading: false,
      uploadBtn: false,
      modalBtn: false,
      types: [],
      tags: [],
      selectTypes: [],
      selectTags: [],
    };
    this.onChange = this.onChange.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.uploadBanner = this.uploadBanner.bind(this);
    this.addImgUrl = this.addImgUrl.bind(this);
    this.createSubmit = this.createSubmit.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.toggleUploadModal = this.toggleUploadModal.bind(this);
    this.toggleCreateModal = this.toggleCreateModal.bind(this);
  }

  componentWillMount() {
    this.getTypes();
    this.getTags();
    if (this.props.location.state && this.props.location.state.aid) {
      this.getArticle(this.props.location.state.aid);
    }
  }

  onChange(val) {
    const text = val;
    this.setState({
      input: text,
    });
  }
  async getTypes() {
    try {
      const result = await API.getTypes();
      if (result.statusCode === GETED) {
        this.setState({
          types: result.data,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  async getTags() {
    try {
      const result = await API.getTags();
      if (result.statusCode === GETED) {
        this.setState({
          tags: result.data,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  async getArticle(parameter) {
    try {
      const result = await API.getArticle({ parameter });
      if (result.statusCode === GETED) {
        const selectTypes = [];
        const selectTags = [];
        result.data.types.forEach((item) => {
          selectTypes.push(item.tid);
        });
        result.data.tags.forEach((item) => {
          selectTags.push(item.tid);
        });
        this.setState({
          title: result.data.title,
          overview: result.data.overview,
          input: result.data.content,
          bannerUrl: config.baseURL + result.data.banner,
          selectTypes,
          selectTags,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  uploadImg(info) {
    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: `http://www.jiangfeather.com/api${info.file.response.data[0].url}`,
        uploadLoading: false,
      });
      message.success('upload success');
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  uploadBanner(info) {
    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        bannerUrl: config.baseURL + info.file.response.data[0].url,
        uploadLoading: false,
      });
      message.success('upload success');
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  addImgUrl() {
    if (this.state.imageUrl) {
      this.setState({
        input: `${this.state.input}\n\n![img](${this.state.imageUrl})`,
      });
    }
    this.toggleUploadModal();
  }
  createSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!this.state.bannerUrl) {
          message.error('please upload banner!');
          return;
        }
        if (this.state.selectTypes.length === 0) {
          message.error('please select type!');
          return;
        }
        if (this.state.selectTags.length === 0) {
          message.error('please select tag!');
          return;
        }
        if (!this.state.input) {
          message.error('please input content!');
          return;
        }
        this.createArticle(values);
      }
    });
  }
  async createArticle(values) {
    this.setState({
      createLoading: true,
    });
    try {
      const data = {
        title: values.title,
        overview: values.overview,
        content: this.state.input,
        banner: this.state.bannerUrl.replace(config.baseURL, ''),
        types: this.state.selectTypes,
        tags: this.state.selectTags,
      };
      let result = null;
      if (this.props.location.state && this.props.location.state.aid) {
        const parameter = this.props.location.state.aid;
        result = await API.putArticle({ parameter, data });
      } else {
        result = await API.postArticles({ data });
      }
      if (result.statusCode === CREATED) {
        if (this.props.location.state && this.props.location.state.aid) {
          message.success('update success');
        } else {
          message.success('create success');
        }
        this.toggleCreateModal();
      }
      this.setState({
        createLoading: false,
      });
    } catch (error) {
      this.setState({
        createLoading: false,
      });
      message.error(error.message);
    }
  }
  toggleUploadModal() {
    this.setState((preState) => {
      const { visibleUpload } = preState;
      return {
        visibleUpload: !visibleUpload,
        imageUrl: '',
      };
    });
  }
  toggleCreateModal() {
    this.props.form.resetFields();
    this.setState((preState) => {
      const { visibleCreate } = preState;
      return {
        visibleCreate: !visibleCreate,
      };
    });
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.uploadLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="write" style={styles.write}>
        <div
          className="editor"
          style={styles.editor}
          onMouseOver={() => {
            setTimeout(() => {
              this.setState({ uploadBtn: true });
            }, 100);
          }}
          onFocus={() => {
            setTimeout(() => {
              this.setState({ uploadBtn: true });
            }, 100);
          }}
          onMouseOut={() => {
            setTimeout(() => {
              this.setState({ uploadBtn: false });
            }, 100);
          }}
          onBlur={() => {
            setTimeout(() => {
              this.setState({ uploadBtn: false });
            }, 100);
          }}
        >
          {this.state.uploadBtn ? (
            <Button
              type="primary"
              shape="circle"
              icon="upload"
              size="large"
              onMouseOver={() => {
                this.setState({ uploadBtn: true });
              }}
              onFocus={() => {
                this.setState({ uploadBtn: true });
              }}
              onClick={() => {
                this.toggleUploadModal();
              }}
              style={styles.uploadButton}
            />
          ) : null}
          <AceEditor
            mode="markdown"
            theme="monokai"
            onChange={this.onChange}
            width="100%"
            height="100%"
            fontSize={14}
            wrapEnabled
            showGutter
            highlightActiveLine
            value={this.state.input}
          />
        </div>
        <div
          className="view"
          style={styles.view}
          onMouseOver={() => {
            setTimeout(() => {
              this.setState({ modalBtn: true });
            }, 100);
          }}
          onFocus={() => {
            setTimeout(() => {
              this.setState({ modalBtn: true });
            }, 100);
          }}
          onMouseOut={() => {
            setTimeout(() => {
              this.setState({ modalBtn: false });
            }, 100);
          }}
          onBlur={() => {
            setTimeout(() => {
              this.setState({ modalBtn: false });
            }, 100);
          }}
        >
          {this.state.modalBtn ? (
            <Button
              type="primary"
              shape="circle"
              icon="save"
              size="large"
              style={styles.modalButton}
              onMouseOver={() => {
                this.setState({ modalBtn: true });
              }}
              onFocus={() => {
                this.setState({ modalBtn: true });
              }}
              onClick={() => {
                this.toggleCreateModal();
              }}
            />
          ) : null}
          <Markdown content={this.state.input} />
        </div>
        <Modal
          title="Upload Img"
          visible={this.state.visibleUpload}
          onOk={this.addImgUrl}
          onCancel={this.toggleUploadModal}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            headers={{
              'X-Requested-With': null,
            }}
            showUploadList={false}
            action={`${config.baseURL}/v1/imgs`}
            onChange={this.uploadImg}
          >
            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
          </Upload>
        </Modal>
        <Modal
          title="Create"
          visible={this.state.visibleCreate}
          onOk={this.createSubmit}
          onCancel={this.toggleCreateModal}
          confirmLoading={this.state.createLoading}
        >
          <Form className="form">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                initialValue: this.state.title,
                rules: [{ required: true, message: 'Please input title!' }],
              })(<Input placeholder="Title" />)}
            </FormItem>
            <FormItem label="Overview">
              {getFieldDecorator('overview', {
                initialValue: this.state.overview,
                rules: [{ required: true, message: 'Please input overview!' }],
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem label="Banner" required="true">
              <Upload
                name="file"
                listType="picture-card"
                className="banner-uploader"
                headers={{
                  'X-Requested-With': null,
                }}
                showUploadList={false}
                action={`${config.baseURL}/v1/imgs`}
                onChange={this.uploadBanner}
              >
                {this.state.bannerUrl ? <img src={this.state.bannerUrl} alt="" /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem label="Type" required>
              <Select
                defaultValue={this.state.selectTypes}
                mode="multiple"
                onChange={(value) => {
                  this.setState({
                    selectTypes: value,
                  });
                }}
              >
                {this.state.types.map(type => (
                  <Option value={type.tid} key={type.tid}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem label="Tag" required>
              <Select
                defaultValue={this.state.selectTags}
                mode="multiple"
                onChange={(value) => {
                  this.setState({
                    selectTags: value,
                  });
                }}
              >
                {this.state.tags.map(tag => (
                  <Option value={tag.tid} key={tag.tid}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

Write.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const WapperWrite = Form.create()(Write);

export default WapperWrite;
