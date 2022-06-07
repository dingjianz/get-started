/* eslint-disable */
import React, { Component, createRef } from 'react';
import { Button, Card, Form, Icon, Input, DatePicker, Spin, message } from 'antd';
import ajax from '../../service';
import E from 'wangeditor';
import moment from 'moment';
import './articleEdit.scss';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: '', // 主键
      spinFlag: true,
    };
    this.editorRef = createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = Object.assign({}, values, {
          createAt: values.createAt.valueOf(),
        });
        this.editArticleById(params);
      }
    });
  };

  goBack = () => {
    this.props.history.goBack();
    // this.props.history.push(
    //   {
    //     pathname: '/admin/article'
    //   }
    // )
  };

  boldFn = () => {
    document.execCommand('bold');
  };

  italicFn = () => {
    document.execCommand('italic');
  };
  foreColorFn = () => {
    document.execCommand('foreColor', null, 'f00');
  };
  initEditor = () => {
    this.editTor = new E(this.editorRef.current);
    this.editTor.customConfig.onchange = (html) => {
      this.props.form.setFieldsValue({
        content: html,
      });
    };
    this.editTor.create();
  };

  getArticleDetailById = () => {
    // 获取文章详情
    ajax
      .post('/api/v1/article/' + this.state.articleId)
      .then((res) => {
        const { id, ...data } = res; // 把id 剔除，form并没有代理这个值
        data.createAt = moment(data.createAt);
        this.props.form.setFieldsValue(data);
        this.editTor.txt.html(data.content);
      })
      .finally(() => {
        this.setState({
          spinFlag: false,
        });
      });
  };
  editArticleById = (params) => {
    // 修改文章
    this.setState({
      spinFlag: true,
    });
    ajax
      .post('/api/v1/articleEdit/' + this.state.articleId, params)
      .then((res) => {
        message.success(res.msg);
        this.props.history.push('/admin/article');
      })
      .finally(() => {
        this.setState({
          spinFlag: false,
        });
      });
  };

  componentDidMount() {
    this.setState(
      {
        articleId: this.props.match.params.id,
      },
      () => {
        this.props.form.validateFields();
        this.initEditor();
        this.getArticleDetailById();
      }
    );
  }

  render() {
    const { spinFlag } = this.state;
    const { getFieldDecorator, getFieldError } = this.props.form;

    const titleError = getFieldError('title');
    const authorError = getFieldError('author');
    const amountError = getFieldError('amount');
    const createAtError = getFieldError('createAt');
    const contentError = getFieldError('content');

    return (
      <Spin spinning={spinFlag}>
        <Card title="文章编辑" bordered={false} extra={<Button onClick={this.goBack}>返回</Button>}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
              label="标题"
              validateStatus={titleError ? 'error' : ''}
              help={titleError || ''}
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                  {
                    min: 3,
                    message: '标题最少输入3位',
                  },
                  {
                    max: 20,
                    message: '标题最多输入20位',
                  },
                ],
                initialValue: '我是初始标题',
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入标题"
                  allowClear
                />
              )}
            </Form.Item>

            <Form.Item
              label="作者"
              hasFeedback
              validateStatus={authorError ? 'error' : ''}
              help={authorError || ''}
            >
              {getFieldDecorator('author', {
                rules: [
                  {
                    required: true,
                    message: '请输入作者',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入作者"
                  allowClear
                />
              )}
            </Form.Item>

            <Form.Item
              label="阅读量"
              hasFeedback
              validateStatus={amountError ? 'error' : ''}
              help={amountError || ''}
            >
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: '请输入阅读量',
                  },
                  {
                    pattern: /^\d+$|^\d+[.]?\d+$/g,
                    message: '请输入数字',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入阅读量"
                />
              )}
            </Form.Item>

            <Form.Item
              label="创建日期"
              validateStatus={createAtError ? 'error' : ''}
              help={createAtError || ''}
            >
              {getFieldDecorator('createAt', {
                rules: [
                  {
                    required: true,
                    message: '请选择日期',
                  },
                ],
              })(<DatePicker showTime placeholder="请选择日期" />)}
            </Form.Item>

            <Form.Item
              label="内容"
              validateStatus={contentError ? 'error' : ''}
              help={contentError || ''}
            >
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: '请输入内容',
                  },
                ],
              })(
                <>
                  {/* 
                    <button onClick={this.boldFn}>加粗</button>
                    <button onClick={this.italicFn}>倾斜</button>
                    <button onClick={this.foreColorFn}>红色字体</button>
                    <div suppressContentEditableWarning  contentEditable='true' style={{border: '1px solid #dedede',width:'300px', minHeight:'300px'}}>
                      这是内容
                    </div>
                  */}
                  <div ref={this.editorRef} className="edit-wrapper"></div>
                </>
              )}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={false}>
                点击保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    );
  }
}

export default ArticleEdit;
