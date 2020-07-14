import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchNoticeList } from '../../store/actions/noticeAction'
import { loginOut } from '../../store/actions/userAction'
import { adminRouter }  from '../../routes'

import logoImg from './logo.png'
import './frame.less'

import { Layout, Menu, Icon, Dropdown, Badge, Avatar } from 'antd'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

const mapStateToProps = state => {
  return {
    noticeCount: state.noticeReducer.list.filter(item => item.hasRead === false).length,
    avatar: state.userReducer.avatar,
    displayName: state.userReducer.displayName
  }
}

@connect(mapStateToProps, { fetchNoticeList, loginOut })
@withRouter
class Frame extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  turnToPage = ({ key }) => {
    if (key === '/login') return this.props.loginOut()
    this.props.history.push(key)
  }

    // 这样写是静态的， Badge不会改变状态，写成组件（这里是函数无状态组件），redux状态改变，组件也会随之改变
    // menu = (
    //   <Menu onClick={this.turnToPage}>
    //     <Menu.Item key='/admin/notice'>
    //       <Badge dot>通知消息</Badge>
    //     </Menu.Item>
    //     <Menu.Item key='/admin/settings'>
    //       个人设置
    //     </Menu.Item>
    //     <Menu.Item key='/login'>
    //       退出登录
    //     </Menu.Item>
    //   </Menu>
    // )
  
  renderMenu = (noticeCount) =>  (
    <Menu onClick={this.turnToPage}>
      <Menu.Item key='/admin/notice'>
        <Badge dot={Boolean(noticeCount)}>通知消息</Badge>
      </Menu.Item>
      <Menu.Item key='/admin/profile'>
        个人设置
      </Menu.Item>
      <Menu.Item key='/login'>
        退出登录
      </Menu.Item>
    </Menu>
  )

  componentDidMount() {
    this.props.fetchNoticeList()
  }

  render() {
    const { avatar, displayName } = this.props
    const pathArr = this.props.location.pathname.split('/')
    let activePathArr = pathArr.slice(0, 3) // 3的原因是：进入详情页时，列表页menu仍选中状态
    let openPathArr = pathArr.slice(0, 4) || []
    let defaultProps = {}
    if (openPathArr.length > 3) {  // 当path超过三层时，即可能进入subMenu二级菜单或着详情页的情况下
      const openKeys = openPathArr.join('/')
      // 如果是isNav显示在sider上，且有子路由，当前path包含父级路由的pathname
      const flag = adminRouter.some(item => item.children && item.isNav && openKeys.includes(item.pathname))
      if (flag) { // 此时可确定一定是进入了二级菜单
        defaultProps = { openKeys }
        activePathArr = pathArr.slice(0, 4) // 此时长度要设置4，3短了
      } 
    }

    return (
      <Layout style={{minHeight:'100%'}}>
        <Header className="header dj-header" style={{backgroundColor:'#fff'}}>
          <div className="dj-logo">
            <img src={logoImg} alt="loading..."/>
          </div>
          <Dropdown overlay={this.renderMenu(this.props.noticeCount)}>
            <div style={{display:'flex',alignItems:'center'}}>
              <Badge count={this.props.noticeCount}>
                <Avatar src={avatar} />
                <span>欢迎你！{displayName}</span>
                <Icon type="down" />
              </Badge>
            </div>
          </Dropdown>
        </Header>
        <Layout className='main-contaniner'>
          <Sider width={200} className='main-sidder'>
            <Menu
              mode="inline"
              selectedKeys={[activePathArr.join('/')]}
              style={{ height: '100%', borderRight: 0 }}
              {...defaultProps}
            >
            {
              this.props.menus.map(route => {
                if (!route.children) {
                  return (
                    <Menu.Item key={route.pathname} onClick={({key}) => this.props.history.push(key)}>
                      <Icon type={route.iconName} /> {route.title}
                    </Menu.Item>
                  )
                } else {
                  return (
                    <SubMenu key={route.pathname} title={
                      <span><Icon type={route.iconName} /> {route.title}</span>
                    }>
                    {
                      route.children.map(subRoute => { 
                        return  <Menu.Item key={subRoute.pathname} onClick={({key}) => this.props.history.push(key)}>{subRoute.title}</Menu.Item>
                      })
                    }
                    </SubMenu>
                  )
                }
              })
            }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }} className='main-content'>
            <Content
              style={{
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame