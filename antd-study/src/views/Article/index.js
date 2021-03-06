import React, { Component } from 'react';
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip } from 'antd';
import { Prompt } from 'react-router-dom';
import ajax from '../../service';
import moment from 'moment';
import XLSX from 'xlsx';
const { Paragraph } = Typography;

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量',
};

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      columns: [],
      dataSource: [],
      total: 0,
      isLoading: true,
      pageNo: 1,
      pageSize: 10,
      deleteModalFlag: false,
      deleteConfirmLoading: false,
      deleteArticleTitle: '',
      deleteId: '',
    };
  }

  setData = (state) => {
    // 如果请求完成之后组件已经销毁，就不需要再setState
    if (!this.updater.isMounted(this)) return;
    this.setState(state);
  };

  createColumns = (columnsKeys) => {
    const columns = columnsKeys.map((item) => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record, index) => {
            const { amount } = record;
            return (
              /* 
                这是根据一个数字的大小做一个条件渲染
                同理，可以做职业级别不同的颜色
                {总经理:'001',主管:'002',科长:'003'}

                const colorMap = {
                  '001': 'red',
                  '002': '#09f',
                  '003': 'green'
                }
              */
              <Tooltip placement="top" title={amount > 600 ? '低于600' : '超过600'}>
                <Tag color={amount > 600 ? 'red' : 'green'}>{amount}</Tag>
              </Tooltip>
            );
          },
        };
      } else if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, reacord) => {
            return moment(reacord.createAt).format('YYYY年MM月DD日 hh:mm:ss');
          },
        };
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      };
    });

    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <Button.Group>
            <Button size="small" type="primary" onClick={() => this.toEditPage(record)}>
              编辑
            </Button>
            <Button size="small" type="danger" onClick={this.showDeleteModal.bind(this, record)}>
              删除
            </Button>
          </Button.Group>
        );
      },
    });
    return columns;
  };

  getData = () => {
    // 获取列表数据
    this.setState({ isLoading: true });
    ajax
      .post('/api/v1/articleList', {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize,
      })
      .then((res) => {
        if (res.list.length < 1) return;
        const columnsKeys = Object.keys(res.list[0]);
        const columns = this.createColumns(columnsKeys);
        this.setData({
          total: res.total,
          dataSource: res.list,
          columns,
        });
      })
      .catch((err) => {
        // 处理错误
      })
      .finally(() => {
        this.setData({ isLoading: false });
      });
  };

  onPageChange = (pageNo, pageSize) => {
    // console.log({pageNo, pageSize})
    this.setState(
      {
        pageNo: pageNo,
        pageSize: pageSize,
      },
      () => {
        // 获取最新数据后再调用方法，因为setState是异步执行的
        this.getData();
      }
    );
  };

  onPageSizeChange = (current, pageSize) => {
    // console.log({current, pageSize})
    // 根据需求更改，改变pageSize以后，是否需要回到第一页
    this.setState(
      {
        pageNo: 1,
        // pageNo: current,
        pageSize: pageSize,
      },
      () => {
        // 获取最新数据后再调用方法，因为setState是异步执行的
        this.getData();
      }
    );
  };

  toExcel = () => {
    // 在实际的项目中，实际上这个功能是前端发送一个ajax请求到后端，然后后端返回一个文件下载的地址
    const { dataSource } = this.state;
    const keys = Object.keys(dataSource[0]);
    const keysName = keys.map((item) => titleDisplayMap[item]);
    const data = [keysName];
    for (let it of dataSource) {
      data.push([
        it.id,
        it.title,
        it.author,
        it.amount,
        moment(it.createAt).format('YYYY年MM月DD日 hh:mm:ss'),
      ]);
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, `article-${this.state.pageNo}-${moment().format('YYYY-MM-DD')}.xlsx`);
  };

  showDeleteModal = (record) => {
    /*  使用函数的方式调用Modal，定制化没那么强
        Modal.confirm({
        title: '删除确认',
        content: `确认要删除${record.title}吗？`,
        okText:'OJJK',
        cancelText: '不搞了',
        onOk (cb) {
          ajax.post('/api/v1/article/delete/'+ record.id).then(res => {
            Modal.success({
              content:res.msg
            })
          })
        },
        onCancel (cb) {
          console.log('cancle')
        }
      })
    */
    this.setState({
      deleteModalFlag: true,
      deleteArticleTitle: `确认要删除${record.title}吗？`,
      deleteId: record.id,
    });
  };

  hideDeleteModal = () => {
    this.setState({
      deleteArticleTitle: '',
      deleteModalFlag: false,
      deleteConfirmLoading: false,
    });
  };

  deleteArticle = () => {
    this.setState({ deleteConfirmLoading: true });
    const { deleteId } = this.state;
    this.deleteArticleById(deleteId)
      .then((res) => {
        message.success(res.msg);
        this.setState(
          {
            // 判断删除完是否留在第一页
            pageNo: 1,
          },
          () => {
            this.getData();
          }
        );
      })
      .finally(() => {
        this.setState({
          deleteConfirmLoading: false,
          deleteModalFlag: false,
        });
      });
  };

  deleteArticleById = (deleteId) => {
    return ajax.post('/api/v1/article/delete/' + deleteId);
  };

  toEditPage = (record) => {
    this.setState({ isOpen: false }, () => {
      this.props.history.push({
        pathname: `/admin/article/edit/${record.id}`,
        state: {
          title: record.title,
        },
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      dataSource,
      columns,
      total,
      isOpen,
      isLoading,
      pageSize,
      pageNo,
      deleteModalFlag,
      deleteArticleTitle,
      deleteConfirmLoading,
    } = this.state;
    return (
      <>
        <Card
          title="文章列表"
          bordered={false}
          extra={<Button onClick={this.toExcel}>导出Excel</Button>}
        >
          <Table
            rowKey={(record) => record.id}
            dataSource={dataSource}
            columns={columns}
            loading={isLoading}
            pagination={{
              total: total,
              current: pageNo,
              pageSize: pageSize,
              hideOnSinglePage: true,
              onChange: this.onPageChange,
              position: 'top',
              showQuickJumper: true,
              showSizeChanger: true,
              onShowSizeChange: this.onPageSizeChange,
              pageSizeOptions: ['10', '15', '16', '38'],
            }}
          />
        </Card>
        <Prompt message="您确定要离开该页面吗?" when={isOpen} />
        <Modal
          visible={deleteModalFlag}
          title="删除确认"
          onCancel={this.hideDeleteModal}
          mask={false}
          maskClosable={false}
          confirmLoading={deleteConfirmLoading}
          onOk={this.deleteArticle}
        >
          <Paragraph>{deleteArticleTitle}</Paragraph>
        </Modal>
      </>
    );
  }
}
