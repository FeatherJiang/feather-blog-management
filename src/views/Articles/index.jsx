import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Avatar, message } from 'antd';
import config from '../../config';
import API from '../../API';
import { GETED, DELETED } from '../../config/statusCode';

const styles = {
  articles: {
    margin: '20px',
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
  },
  img: {
    width: '100px',
  },
};

class Articles extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      articleLoading: false,
      articlesPagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        articleOrder: 'DESC',
        articlekKey: '',
      },
      articles: [],
      delArticleLoading: false,
      aid: 0,
      commentLoading: false,
      delCommentLoading: false,
      commentsPagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        commentOrder: 'DESC',
      },
      comments: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getComments = this.getComments.bind(this);
    this.handleArticlesTableChange = this.handleArticlesTableChange.bind(this);
    this.handleCommentsTableChange = this.handleCommentsTableChange.bind(this);
  }
  componentWillMount() {
    this.getArticles();
  }
  async getArticles() {
    this.setState({
      articleLoading: true,
    });
    try {
      const params = {
        page: this.state.articlesPagination.current,
        limit: this.state.articlesPagination.pageSize,
        order: this.state.articlesPagination.articleOrder,
        key: this.state.articlesPagination.articlekKey,
      };
      const result = await API.getArticles({ params });
      if (result.statusCode === GETED) {
        const articlesPagination = { ...this.state.articlesPagination };
        articlesPagination.total = result.data.count;
        this.setState({
          articlesPagination,
          articles: result.data.rows,
        });
      }
      this.setState({
        articleLoading: false,
      });
    } catch (error) {
      this.setState({
        articleLoading: false,
      });
      message.error(error.message);
    }
  }
  async getComments(parameter) {
    this.setState({
      aid: parameter,
      commentLoading: true,
    });
    try {
      const params = {
        page: this.state.commentsPagination.current,
        limit: this.state.commentsPagination.pageSize,
        order: this.state.commentsPagination.commentOrder,
      };
      const result = await API.getComments({ parameter, params });
      if (result.statusCode === GETED) {
        const commentsPagination = { ...this.state.commentsPagination };
        commentsPagination.total = result.data.count;
        this.setState({
          commentsPagination,
          comments: result.data.rows,
        });
      }
      this.setState({
        commentLoading: false,
      });
    } catch (error) {
      this.setState({
        commentLoading: false,
      });
      message.error(error.message);
    }
  }
  async delArticle(parameter) {
    this.setState({
      delArticleLoading: true,
    });
    try {
      const result = await API.delArticle({ parameter });
      if (result.statusCode === DELETED) {
        message.success('delete success');
        this.getArticles(this.state.aid);
      }
      this.setState({
        delArticleLoading: false,
      });
    } catch (error) {
      this.setState({
        delArticleLoading: false,
      });
      message.error(error.message);
    }
  }
  async delComment(cid) {
    this.setState({
      delCommentLoading: true,
    });
    try {
      const parameter = {
        aid: this.state.aid,
        cid,
      };
      const result = await API.delComment({ parameter });
      if (result.statusCode === DELETED) {
        message.success('delete success');
        this.getComments(this.state.aid);
      }
      this.setState({
        delCommentLoading: false,
      });
    } catch (error) {
      this.setState({
        delCommentLoading: false,
      });
      message.error(error.message);
    }
  }
  handleArticlesTableChange(pagination) {
    const pager = { ...this.state.articlesPagination };
    pager.current = pagination.current;
    this.setState(
      {
        articlesPagination: pager,
      },
      () => {
        this.getArticles();
      },
    );
  }
  handleCommentsTableChange(pagination) {
    const pager = { ...this.state.commentsPagination };
    pager.current = pagination.current;
    this.setState(
      {
        commentsPagination: pager,
      },
      () => {
        this.getComments(this.state.aid);
      },
    );
  }
  toggleModal() {
    this.setState((preState) => {
      const { visible } = preState;
      return {
        visible: !visible,
      };
    });
  }
  render() {
    const articleColumns = [
      {
        title: 'Id',
        dataIndex: 'aid',
        key: 'aid',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Banner',
        dataIndex: 'banner',
        key: 'banner',
        render: text => <img src={config.baseURL + text} alt="" style={styles.img} />,
      },
      {
        title: 'Comments',
        key: 'comments',
        render: (text, record) => (
          <Button
            type="primary"
            onClick={() => {
              this.toggleModal();
              this.getComments(record.aid);
            }}
          >
            Comments
          </Button>
        ),
      },
      {
        title: 'Modify',
        key: 'modify',
        render: (text, record) => (
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push('/home/write', { aid: record.aid });
            }}
          >
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
            loading={this.state.delArticleLoading}
            onClick={() => this.delArticle(record.aid)}
          >
            Delete
          </Button>
        ),
      },
    ];
    const commentColumns = [
      {
        title: 'Id',
        dataIndex: 'cid',
        key: 'cid',
      },
      {
        title: 'Aavtar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: text => <Avatar src={text} />,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (text, record) => (
          <Button
            type="danger"
            disabled={!!record.children}
            loading={this.state.delCommentLoading}
            onClick={() => this.delComment(record.cid)}
          >
            Delete
          </Button>
        ),
      },
    ];
    return (
      <div className="Articles" style={styles.articles}>
        <Table
          rowKey={record => record.aid}
          columns={articleColumns}
          dataSource={this.state.articles}
          pagination={this.state.articlesPagination}
          loading={this.state.articleLoading}
          onChange={this.handleArticlesTableChange}
        />
        <Modal
          title="Comments"
          visible={this.state.visible}
          onOk={this.toggleModal}
          onCancel={this.toggleModal}
          width="800px"
        >
          <Table
            rowKey={record => record.cid}
            columns={commentColumns}
            dataSource={this.state.comments}
            pagination={this.state.commentsPagination}
            loading={this.state.commentLoading}
            onChange={this.handleCommentsTableChange}
          />
        </Modal>
      </div>
    );
  }
}

Articles.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Articles;
