import { FC, lazy, Suspense } from 'react';
import {
  Routes,
  BrowserRouter as Router,
  Route,
  RouteProps,
  Navigate,
} from 'react-router-dom';

const OtherDemo = lazy(() => import('pages/other'));
const ContextDemo = lazy(() => import('pages/context'));
const UserDemo = lazy(() => import('pages/profile/user'));
const MeDemo = lazy(() => import('pages/profile/me'));
const HeDemo = lazy(() => import('pages/profile/he'));
const TodoList = lazy(() => import('pages/todoList'));
const NotFoundDemo = lazy(() => import('pages/notFound'));
const DragDemo = lazy(() => import('pages/drag'));
const AnchorDemo = lazy(() => import('pages/anchor'));

const RouteConfig: FC<RouteProps> = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        <Route path="/" caseSensitive element={<TodoList />} />
        <Route path="/other" caseSensitive element={<OtherDemo />} />
        <Route path="/context" element={<ContextDemo />} />
        <Route path="/user" element={<UserDemo />}>
          <Route path="me" element={<MeDemo />} />
          <Route path="he" element={<HeDemo />} />
        </Route>
        <Route path="/drag" element={<DragDemo />} />
        <Route path="/anchor" element={<AnchorDemo />} />
        <Route path="/404" element={<NotFoundDemo />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Router>
  </Suspense>
);

export default RouteConfig;
