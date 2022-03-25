import Loadable from 'react-loadable';

// import Loadable from './selfLoadable' // 简易react-loadable原理
import { Loading } from '../components';

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
});
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
});
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading,
});
const ArticleEdit = Loadable({
  loader: () => import('./Article/ArticleEdit'),
  loading: Loading,
});
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading,
});
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
});
const Notice = Loadable({
  loader: () => import('./Notice'),
  loading: Loading,
});
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading,
});
const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading,
});
const TestIndex = Loadable({
  loader: () => import('./Test'),
  loading: Loading,
});

const CssIndex = Loadable({
  loader: () => import('./Test/cssIndex'),
  loading: Loading,
});

const TimeLine = Loadable({
  loader: () => import('./Test/TimeLine'),
  loading: Loading,
});

const HocComponent = Loadable({
  loader: () => import('./Test/hoc'),
  loading: Loading,
});

const Parabola = Loadable({
  loader: () => import('./Test/Parabola'),
  loading: Loading,
});

const TreeDemo = Loadable({
  loader: () => import('./Test/Tree'),
  loading: Loading,
});

const EchartDemo = Loadable({
  loader: () => import('./Test/echart'),
  loading: Loading,
});

const UseRefDemo = Loadable({
  loader: () => import('./Test/useRef'),
  loading: Loading,
});

const ImgLazyLoad = Loadable({
  loader: () => import('./Test/lazyLoad'),
  loading: Loading,
});

const Draggable = Loadable({
  loader: () => import('./Test/draggable'),
  loading: Loading,
});

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
  TimeLine,
  Parabola,
  HocComponent,
  TreeDemo,
  EchartDemo,
  UseRefDemo,
  ImgLazyLoad,
  Draggable,
};

// export { default as Login } from './Login'
// export { default as Dashboard } from './Dashboard'
// export { default as ArticleList } from './Article'
// export { default as ArticleEdit } from './Article/ArticleEdit'
// export { default as Settings } from './Settings'
// export { default as NotFound } from './NotFound'
