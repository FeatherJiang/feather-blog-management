import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Form, Input, Modal, message, Divider } from 'antd';
import API from '../../API';
import { GETED, CREATED, DELETED } from '../../config/statusCode';

const FormItem = Form.Item;

const styles = {
  types: {
    margin: '20px',
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
  },
  img: {
    width: '100px',
  },
};

class Types extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleAdd: false,
      visibleModify: false,
      typeLoading: false,
      modifyLoading: false,
      delLoading: false,
      types: [],
      tid: null,
    };
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleModifyModal = this.toggleModifyModal.bind(this);
    this.addSubmit = this.addSubmit.bind(this);
    this.modifySubmit = this.modifySubmit.bind(this);
  }
  componentWillMount() {
    this.getTypes();
  }
  async getTypes() {
    this.setState({
      typeLoading: true,
    });
    try {
      const result = await API.getTypes();
      if (result.statusCode === GETED) {
        this.setState({
          types: result.data,
        });
      }
      this.setState({
        typeLoading: false,
      });
    } catch (error) {
      this.setState({
        typeLoading: false,
      });
      message.error(error.message);
    }
  }
  addSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.postTypes(values);
      }
    });
  }
  async postTypes(data) {
    this.setState({
      addLoading: true,
    });
    try {
      const result = await API.postTypes({ data });
      if (result.statusCode === CREATED) {
        this.getTypes();
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
        this.putType(values);
      }
    });
  }
  async putType(data) {
    this.setState({
      modifyLoading: true,
    });
    try {
      const result = await API.putType({ parameter: this.state.tid, data });
      if (result.statusCode === CREATED) {
        message.success('update success');
        this.getTypes();
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
  async delType(tid) {
    this.setState({
      delLoading: true,
    });
    try {
      const result = await API.delType({ parameter: tid });
      if (result.statusCode === DELETED) {
        message.success('delete success');
        this.getTypes();
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
    const typeColumns = [
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
            onClick={() => this.delType(record.tid)}
          >
            Delete
          </Button>
        ),
      },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Types" style={styles.types}>
        <Button type="primary" onClick={this.toggleAddModal}>
          Add
        </Button>
        <Divider />
        <Table
          rowKey={record => record.tid}
          columns={typeColumns}
          dataSource={this.state.types}
          loading={this.state.typeLoading}
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
                rules: [{ required: true, message: 'Please input type!' }],
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
                rules: [{ required: true, message: 'Please input type!' }],
              })(<Input placeholder="Name" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

Types.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

const WapperTypes = Form.create()(Types);

export default WapperTypes;
