/*  eslint-disable */
import React, { useEffect, useState } from "react";
import Title from "components/Tile";
import Lee from "components/Lee";
import ThemeContext from "api/theme";

import { getUserInfo } from "api/userApi";

import avatar from "assets/images/avtar.jpg";

function App() {
  const [count, setCount] = useState<number | null>(1);
  const obj: Jianding.CommonObj = {
    name: "jianding9",
    age: 18,
    sayHello() {
      console.log("hello");
    },
  };

  type Pair<T> = [T, T];

  const num: Pair<string> = ["1", "1"];
  console.log(num);

  const m1 = new Map<string, string>();
  m1.set("key1", "value1");
  m1.set("key2", "value2");
  console.log(m1.get("key2"));

  useEffect(() => {
    getUserInfo("jianding9", 127);
  }, []);

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
      <img src={avatar} alt="" width="100" />
      <ThemeContext.Consumer>
        {(value) => {
          console.log("context--consumer:::", value);
          return <div>{value.background}</div>;
        }}
      </ThemeContext.Consumer>
    </div>
  );
}

export default App;
