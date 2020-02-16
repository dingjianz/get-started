import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd'
import { loginFn } from '../../store/actions/userAction'

import './login.scss'

const wrapperCol = {
  xs: {
    span:24
  },
  md: {
    span: 12,
    offset:6
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    isLoading: state.userReducer.isLoading
  }
}

@connect(mapStateToProps, { loginFn })
@Form.create()
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginFn(values)
      }
    })
  }

  render() {
    const { isLoading, isLogin } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      isLogin
      ?
      <Redirect to='/admin' />
      :
      <Card
        title='登录'
        bordered={false}
        className='card-wrapper'
      >
        <Form
          wrapperCol={wrapperCol}
          onSubmit={this.handleSubmit}
        >
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名必须！' }],
            })(
              <Input
                prefix={<Icon type="user"
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
                allowClear
                disabled={isLoading}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码必须！' }],
            })(
              <Input
                prefix={<Icon type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='密码'
                allowClear
                disabled={isLoading}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox disabled={isLoading}>记住我</Checkbox>)}
            <Button loading={isLoading} type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}


export default Login
// module.exports = Login