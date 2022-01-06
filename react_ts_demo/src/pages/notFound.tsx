import { FC, useContext } from 'react';
import ThemeContext from 'api/theme';

interface Props {
  [propName: string]: unknown;
}

const NotFoundDemo: FC<Props> = () => {
  const context = useContext(ThemeContext);
  console.log('useContext:::', context);
  return <div>直接就404了啊</div>;
};

export default NotFoundDemo;
