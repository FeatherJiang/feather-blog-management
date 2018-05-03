import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { NavLink, withRouter, Route } from 'react-router-dom';
import Write from '../Write';
import Articles from '../Articles';
import Types from '../Types';
import Tags from '../Tags';
import Introduce from '../Introduce';
import Logo from '../../assets/img/WhiteLogo.png';

const { Sider, Content } = Layout;

const styles = {
  layout: {
    minHeight: '100vh',
  },
  logo: {
    display: 'block',
    width: '50px',
    height: '50px',
    margin: '5px auto',
  },
};

class LayoutMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { location } = this.props;
    return (
      <Layout style={styles.layout}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
          <Avatar shape="cicle" size="large" src={Logo} style={styles.logo} />
          <Menu
            theme="dark"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            mode="inline"
          >
            <Menu.Item key="/home/write">
              <NavLink to="/home/write">
                <Icon type="edit" />
                <span>Write</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/home/articles">
              <NavLink to="/home/articles">
                <Icon type="profile" />
                <span>Articles</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/home/types">
              <NavLink to="/home/types">
                <Icon type="book" />
                <span>Types</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/home/tags">
              <NavLink to="/home/tags">
                <Icon type="tags" />
                <span>Tags</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/home/introduce">
              <NavLink to="/home/introduce">
                <Icon type="solution" />
                <span>Introduce</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Route path="/home/write" exact component={Write} />
            <Route path="/home/articles" exact component={Articles} />
            <Route path="/home/types" exact component={Types} />
            <Route path="/home/tags" exact component={Tags} />
            <Route path="/home/introduce" exact component={Introduce} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

LayoutMenu.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(LayoutMenu);
