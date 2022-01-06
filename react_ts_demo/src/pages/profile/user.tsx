import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  [propName: string]: unknown;
}

const UserDemo: FC<Props> = () => (
  <div>
    user demo
    <hr />
    <Outlet />
  </div>
);

export default UserDemo;
