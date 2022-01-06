import { FC, MouseEventHandler } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

interface Props {
  [propName: string]: any;
}

const MeDemo: FC<Props> = () => {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/user/he');
  };

  return (
    <div>
      me demo
      <hr />
      <NavLink to="../he">点我去 he</NavLink>
      <button type="button" onClick={handleClick}>go he</button>
    </div>
  );
};

export default MeDemo;
