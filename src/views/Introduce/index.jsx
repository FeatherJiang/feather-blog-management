import React from "react";
import PropTypes from "prop-types";
import { Spin, Button, Upload, message, Modal, Icon, Form, Input } from "antd";
import AceEditor from "react-ace";
import "brace/mode/markdown";
import "brace/theme/monokai";
import config from "../../config";
import Markdown from "../../components/Markdown";
import API from "../../API";
import { GETED, CREATED } from "../../config/statusCode";

const FormItem = Form.Item;

const styles = {
  introduce: {
    display: "flex",
    width: "100%",
    height: "100vh",
  },
  editor: {
    position: "relative",
    width: "50%",
    height: "100%",
  },
  view: {
    position: "relative",
    width: "50%",
    overflow: "auto",
  },
  uploadButton: {
    position: "fixed",
    zIndex: "99999",
    top: "10px",
    right: "10px",
  },
  modalButton: {
    position: "fixed",
    zIndex: "99999",
    top: "10px",
    right: "10px",
  },
  uploadImg: {
    width: "300px",
  },
};

class Introduce extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      visibleUpload: false,
      visibleUpdate: false,
      input: "",
      imageUrl: "",
      avatar: "",
      name: "",
      email: "",
      url: "",
      uploadLoading: false,
      updateLoading: false,
      uploadBtn: false,
      modalBtn: false,
    };
    this.onChange = this.onChange.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.uploadBanner = this.uploadBanner.bind(this);
    this.addImgUrl = this.addImgUrl.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.toggleUploadModal = this.toggleUploadModal.bind(this);
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
  }

  componentWillMount() {
    this.getUser();
  }

  onChange(val) {
    const text = val;
    this.setState({
      input: text,
    });
  }
  async getUser() {
    this.setState({
      loading: true,
    });
    try {
      const result = await API.getUser();
      if (result.statusCode === GETED) {
        this.setState({
          name: result.data.name,
          avatar: result.data.avatar,
          email: result.data.email,
          url: result.data.url,
          input: result.data.introduce,
        });
      }
      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      message.error(error.message);
    }
  }
  uploadImg(info) {
    if (info.file.status === "uploading") {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        imageUrl: `http://www.jiangfeather.com/api${info.file.response.data[0].url}`,
        uploadLoading: false,
      });
      message.success("upload success");
    }
    if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  uploadBanner(info) {
    if (info.file.status === "uploading") {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        avatar: config.baseURL + info.file.response.data[0].url,
        uploadLoading: false,
      });
      message.success("upload success");
    }
    if (info.file.status === "error") {
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
  updateSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.updateUser(values);
      }
    });
  }
  async updateUser(values) {
    this.setState({
      updateLoading: true,
    });
    try {
      const data = {
        introduce: this.state.input,
        avatar: this.state.avatar.replace(config.baseURL, ""),
      };
      Object.keys(values).forEach((item) => {
        if (values[item]) {
          data[item] = values[item];
        }
      });
      const result = await API.putUser({ data });
      if (result.statusCode === CREATED) {
        this.setState({
          name: result.data[0].name,
          avatar: result.data[0].avatar,
          email: result.data[0].email,
          url: result.data[0].url,
          input: result.data[0].introduce,
        });
        message.success("update success");
        this.toggleUpdateModal();
      }
      this.setState({
        updateLoading: false,
      });
    } catch (error) {
      this.setState({
        updateLoading: false,
      });
      message.error(error.message);
    }
  }
  toggleUploadModal() {
    this.setState((preState) => {
      const { visibleUpload } = preState;
      return {
        visibleUpload: !visibleUpload,
        imageUrl: "",
      };
    });
  }
  toggleUpdateModal() {
    this.props.form.resetFields();
    this.setState((preState) => {
      const { visibleUpdate } = preState;
      return {
        visibleUpdate: !visibleUpdate,
      };
    });
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.uploadLoading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin
        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
        spinning={this.state.loading}
      >
        <div className="introduce" style={styles.introduce}>
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
                  this.toggleUpdateModal();
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
                "X-Requested-With": null,
              }}
              showUploadList={false}
              action={`${config.baseURL}/v1/imgs`}
              onChange={this.uploadImg}
            >
              {this.state.imageUrl ? (
                <img
                  src={this.state.imageUrl}
                  style={styles.uploadImg}
                  alt=""
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Modal>
          <Modal
            title="Update"
            visible={this.state.visibleUpdate}
            onOk={this.updateSubmit}
            onCancel={this.toggleUpdateModal}
            confirmLoading={this.state.updateLoading}
          >
            <Form className="form">
              <FormItem label="Name">
                {getFieldDecorator("name", {
                  initialValue: this.state.name,
                  rules: [{ required: false, message: "Please input name!" }],
                })(<Input placeholder="Name" />)}
              </FormItem>
              <FormItem label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    { required: false, message: "Please input password!" },
                  ],
                })(<Input placeholder="Password" type="password" />)}
              </FormItem>
              <FormItem label="Avatar" required={false}>
                <Upload
                  name="file"
                  listType="picture-card"
                  className="banner-uploader"
                  headers={{
                    "X-Requested-With": null,
                  }}
                  showUploadList={false}
                  action={`${config.baseURL}/v1/imgs`}
                  onChange={this.uploadBanner}
                >
                  {this.state.avatar ? (
                    <img
                      src={this.state.avatar}
                      style={styles.uploadImg}
                      alt=""
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </FormItem>
              <FormItem label="Email">
                {getFieldDecorator("email", {
                  initialValue: this.state.email,
                  rules: [{ required: false, message: "Please input email!" }],
                })(<Input placeholder="Email" />)}
              </FormItem>
              <FormItem label="Url">
                {getFieldDecorator("url", {
                  initialValue: this.state.url,
                  rules: [{ required: false, message: "Please input url!" }],
                })(<Input placeholder="Url" />)}
              </FormItem>
            </Form>
          </Modal>
        </div>
      </Spin>
    );
  }
}

Introduce.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

const WapperIntroduce = Form.create()(Introduce);

export default WapperIntroduce;
