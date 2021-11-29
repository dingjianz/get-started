/* eslint-disabled */
import React, { Component, Fragment } from 'react';
import { Button, Card, Form, Icon, Input, Checkbox } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 14 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 14 },
  },
};

@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sunnameValidateStatus: '', // success warning error validating
      sunnameHelp: '', // 提示文案
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  hasErrors = (fieldsError) => {
    console.log({ fieldsError });
    return Object.keys(fieldsError).some((field) => {
      console.log({ field });
      return fieldsError[field];
    });
  };

  render() {
    const { sunnameValidateStatus, sunnameHelp } = this.state;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const sunnameError = isFieldTouched('sunname') && getFieldError('sunname');
    return (
      <>
        <Card title="文章编辑" bordered={false} extra={<Button>返回</Button>}>
          <Form
            labelAlign="right"
            // labelCol={{
            //   lg: {span:5}
            // }}
            // wrapperCol={{
            //   span:10
            // }}
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <Form.Item label="usernmae">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                  {
                    min: 4,
                    message: 'username最少输入4位',
                  },
                  {
                    max: 10,
                    message: 'username最多输入10位',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>

            <Form.Item
              label="sunname"
              hasFeedback
              validateStatus={sunnameValidateStatus}
              help={sunnameHelp}
            >
              {getFieldDecorator('sunname', {
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      // 自定义验证规则
                      console.log({ rule, value, callback });
                      if (value === '123') {
                        this.setState({
                          sunnameValidateStatus: 'error',
                          sunnameHelp: 'sunname不能输入123',
                        });
                      } else {
                        this.setState({
                          sunnameValidateStatus: '',
                          sunnameHelp: '',
                        });
                      }
                      // callback()
                    },
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="sunname"
                />
              )}
            </Form.Item>

            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError)}>
                Log in
              </Button>
              Or
              <a>register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}

export default ArticleEdit;
