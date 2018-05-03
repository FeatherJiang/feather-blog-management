import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Icon, Input, Button, message } from 'antd';
import Background from '../../assets/img/BlackBackground.jpg';
import Logo from '../../assets/img/BlackLogo.png';
import API from '../../API';
import { CREATED } from '../../config/statusCode';

const FormItem = Form.Item;

const styles = {
  login: {
    position: 'relative',
    height: '100%',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'space',
  },
  loginForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    margin: '-200px -150px',
  },
  loginFormBtn: {
    width: '100%',
  },
  logo: {
    display: 'block',
    margin: '0 auto',
  },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values);
      }
    });
  }

  async login(data) {
    this.setState({
      loading: true,
    });
    try {
      const result = await API.login({ data });
      this.setState({
        loading: false,
      });
      if (result.statusCode === CREATED) {
        localStorage.setItem('token', result.data);
        this.props.history.push('/home/write');
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      message.error(error.message);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login" style={styles.login}>
        <Card
          title={<Avatar shape="cicle" size="large" src={Logo} style={styles.logo} />}
          style={styles.loginForm}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name"
              />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />)}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.loading}
                style={styles.loginFormBtn}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const WapperLogin = Form.create()(Login);

export default WapperLogin;
