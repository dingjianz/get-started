import { useEffect } from 'react';
import RoutesConfig from 'router/index';

function App() {
  useEffect(() => {
    window.addEventListener('orientationchange', () => {
      // alert(window.orientation);
      console.log(window.orientation);
    });
    return () => {
      window.removeEventListener('orientationchange', () => {
        // alert(window.orientation);
        console.log(window.orientation);
      });
    };
  }, []);
  return <RoutesConfig />;
}

export default App;
