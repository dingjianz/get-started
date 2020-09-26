import Loadable from 'react-loadable'
// import Loadable from './selfLoadable' // 简易react-loadable原理
import { Loading } from '../components'

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/ArticleEdit'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Notice = Loadable({
  loader: () => import('./Notice'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})
const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})
const TestIndex = Loadable({
  loader: () => import('./Test'),
  loading: Loading
})

const CssIndex = Loadable({
  loader: () => import('./Test/cssIndex/index.jsx'),
  loading: Loading
})

const TimeLine = Loadable({
  loader: () => import('./Test/TimeLine/index.jsx'),
  loading: Loading
})

export {
  Login,
  Dashboard,
  ArticleList,
  ArticleEdit,
  Settings,
  NotFound,
  Notice,
  NoAuth,
  Profile,
  TestIndex,
  CssIndex,
  TimeLine
}


// export { default as Login } from './Login'
// export { default as Dashboard } from './Dashboard'
// export { default as ArticleList } from './Article'
// export { default as ArticleEdit } from './Article/ArticleEdit'
// export { default as Settings } from './Settings'
// export { default as NotFound } from './NotFound'