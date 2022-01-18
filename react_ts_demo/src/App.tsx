import { FC, ReactElement, useEffect } from 'react';
import RoutesConfig from 'router/index';

const App: FC = (): ReactElement => {
  useEffect(() => {
    window.addEventListener('orientationchange', () => {
      console.log(window.orientation);
    });
    return () => {
      window.removeEventListener('orientationchange', () => {
        console.log(window.orientation);
      });
    };
  }, []);
  return <RoutesConfig />;
};

export default App;
