import { useEffect } from "react";
import RoutesConfig from "router/index";

function App() {
  useEffect(() => {
    window.addEventListener("orientationchange", function () {
      // alert(window.orientation);
      console.log(window.orientation);
    });
    return () => {
      window.removeEventListener("orientationchange", function () {
        // alert(window.orientation);
        console.log(window.orientation);
      });
    };
  }, []);
  return <RoutesConfig />;
}

export default App;
