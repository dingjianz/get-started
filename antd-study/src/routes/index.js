import { Dashboard, Login, NotFound, Settings, ArticleList, ArticleEdit, Notice, NoAuth, Profile } from '../views'

export const mainRouter = [{ // 和app同级
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRouter =[{
  pathname: '/admin/dashboard',
  component: Dashboard,
  title: '仪表盘',
  isNav: true,
  iconName: 'dashboard',
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/article',
  component: ArticleList,
  exact: true,
  title: '文章管理',
  isNav: true,
  iconName: 'unordered-list',
  roles: ['001', '002']
}, {
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  exact: true,
  title: '文章编辑',
  roles: ['001', '002']
},{
  pathname: '/admin/notice',
  component: Notice,
  title: '消息中心',
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/settings',
  component: Settings,
  title: '设置',
  isNav: true,
  iconName: 'setting',
  roles: ['001']
}, {
  pathname: '/admin/noauth',
  component: NoAuth,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/profile',
  component: Profile,
  roles: ['001', '002', '003']
}]