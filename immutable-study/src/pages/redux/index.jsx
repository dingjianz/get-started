import React, { useState, memo } from "react";
import { useHistory } from "react-router-dom";
import { CounterBtn, CounterDisplay } from "@/components";
import { connect } from "react-redux";
import { addCountAction, reduceCountAction } from "@/store/actions/todoAction";
import { fromJS, is } from 'immutable';

const WithImmutableComponnet = (WrappedComponent) => {
  return memo(WrappedComponent, (prevProps, nextProps) => {
    const obj1 = fromJS(prevProps);
    const obj2 = fromJS(nextProps);
    // shouldComponnetUpdate return !is(obj1, obj2);
    return is(obj1, obj2);
  } )
}

const MuouComponnet = WithImmutableComponnet(({ name, obj }) => {
  console.log("木偶组件 render");
  return <h2>{name}</h2>;
});

const ReduxDdemo = (props) => {
  const [num, setnum] = useState(0);
  const history = useHistory();

  // 跳转immuteable页面
  const turnToImmuteablePage = () => {
    history.push("/immutable");
  };

  return (
    <div>
      <CounterBtn onClick={() => props.reduceCountAction(2)}>-</CounterBtn>
      <CounterDisplay />
      <CounterBtn onClick={() => props.addCountAction(2)}>+</CounterBtn>
      <hr />
      <button onClick={() => setnum(num + 1)}>改变num</button>
      <h2>{num}</h2>
      <MuouComponnet name="木偶组件" obj={{ x: 1, y: 2 }} />

      <hr />
      <button onClick={turnToImmuteablePage}>跳转immuteable</button>
    </div>
  );
};

export default connect(null, { addCountAction, reduceCountAction })(ReduxDdemo);
