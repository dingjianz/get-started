import { FC, ReactElement } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Props {
  [propName: string]: unknown;
}

const HeDemo: FC<Props> = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <div>
      he demo
      <hr />
      <Link to="/user/me">点我去me</Link>
      <button type="button" onClick={() => navigate('../me')}>go me</button>
    </div>
  );
};

export default HeDemo;
