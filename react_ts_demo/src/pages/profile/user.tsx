import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  [propName: string]: any;
}

const UserDemo: FC<Props> = (props) => (
  <div>
    user demo
    <hr />
    <Outlet />
  </div>
);

export default UserDemo;
