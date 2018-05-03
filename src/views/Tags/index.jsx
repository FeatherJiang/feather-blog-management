import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Form, Input, Modal, message, Divider } from 'antd';
import API from '../../API';
import { GETED, CREATED, DELETED } from '../../config/statusCode';

const FormItem = Form.Item;

const styles = {
  tags: {
    margin: '20px',
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
  },
  img: {
    width: '100px',
  },
};

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleAdd: false,
      visibleModify: false,
      tagLoading: false,
      modifyLoading: false,
      delLoading: false,
      tags: [],
      tid: null,
    };
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleModifyModal = this.toggleModifyModal.bind(this);
    this.addSubmit = this.addSubmit.bind(this);
    this.modifySubmit = this.modifySubmit.bind(this);
  }
  componentWillMount() {
    this.getTags();
  }
  async getTags() {
    this.setState({
      tagLoading: true,
    });
    try {
      const result = await API.getTags();
      if (result.statusCode === GETED) {
        this.setState({
          tags: result.data,
        });
      }
      this.setState({
        tagLoading: false,
      });
    } catch (error) {
      this.setState({
        tagLoading: false,
      });
      message.error(error.message);
    }
  }
  addSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.postTags(values);
      }
    });
  }
  async postTags(data) {
    this.setState({
      addLoading: true,
    });
    try {
      const result = await API.postTags({ data });
      if (result.statusCode === CREATED) {
        this.getTags();
        this.toggleAddModal();
      }
      this.setState({
        addLoading: false,
      });
    } catch (error) {
      this.setState({
        addLoading: false,
      });
      message.error(error.message);
    }
  }
  modifySubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.putTag(values);
      }
    });
  }
  async putTag(data) {
    this.setState({
      modifyLoading: true,
    });
    try {
      const result = await API.putTag({ parameter: this.state.tid, data });
      if (result.statusCode === CREATED) {
        message.success('update success');
        this.getTags();
        this.toggleModifyModal();
      }
      this.setState({
        modifyLoading: false,
      });
    } catch (error) {
      this.setState({
        modifyLoading: false,
      });
      message.error(error.message);
    }
  }
  async delTag(tid) {
    this.setState({
      delLoading: true,
    });
    try {
      const result = await API.delTag({ parameter: tid });
      if (result.statusCode === DELETED) {
        message.success('delete success');
        this.getTags();
      }
      this.setState({
        delLoading: false,
      });
    } catch (error) {
      this.setState({
        delLoading: false,
      });
      message.error(error.message);
    }
  }
  toggleAddModal(tid) {
    this.props.form.resetFields();
    this.setState((preState) => {
      const { visibleAdd } = preState;
      return {
        tid,
        visibleAdd: !visibleAdd,
      };
    });
  }
  toggleModifyModal(tid) {
    this.props.form.resetFields();
    this.setState((preState) => {
      const { visibleModify } = preState;
      return {
        tid,
        visibleModify: !visibleModify,
      };
    });
  }
  render() {
    const tagColumns = [
      {
        title: 'Id',
        dataIndex: 'tid',
        key: 'tid',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Modify',
        key: 'modify',
        render: (text, record) => (
          <Button type="primary" onClick={() => this.toggleModifyModal(record.tid)}>
            Modify
          </Button>
        ),
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (text, record) => (
          <Button
            type="danger"
            loading={this.state.delLoading}
            onClick={() => this.delTag(record.tid)}
          >
            Delete
          </Button>
        ),
      },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Tags" style={styles.tags}>
        <Button type="primary" onClick={this.toggleAddModal}>
          Add
        </Button>
        <Divider />
        <Table
          rowKey={record => record.tid}
          columns={tagColumns}
          dataSource={this.state.tags}
          loading={this.state.tagLoading}
        />
        <Modal
          title="Modify"
          visible={this.state.visibleModify}
          onOk={this.modifySubmit}
          onCancel={this.toggleModifyModal}
          confirmLoading={this.state.modifyLoading}
        >
          <Form className="form">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input tag!' }],
              })(<Input placeholder="Name" />)}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="Add"
          visible={this.state.visibleAdd}
          onOk={this.addSubmit}
          onCancel={this.toggleAddModal}
          confirmLoading={this.state.addLoading}
        >
          <Form className="form">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input tag!' }],
              })(<Input placeholder="Name" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

Tags.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

const WapperTags = Form.create()(Tags);

export default WapperTags;
