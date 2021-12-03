import React from "react";
import "./App.css";

import Title from "./component/Tile";
import Lee from "./component/Lee";

function App() {
  return (
    <div className="App">
      <Title title="我是头部" />
      <Lee
        name="Lee_name"
        user={{
          name: "jianding9",
          sex: "male",
          say() {
            console.log("say方法");
          },
        }}
      />
    </div>
  );
}

export default App;
