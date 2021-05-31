import React from "react";
import { useHistory } from "react-router-dom";
import { CounterBtn, CounterDisplay } from "@/components";
import { connect } from "react-redux";
import { addCountAction, reduceCountAction } from "@/store/actions/todoAction";

const ReduxDdemo = (props) => {
  const history = useHistory();

  // 跳转immuteable页面
  const turnToImmuteablePage = () => {
    history.push("/immutable");
  };

  return (
    <div>
      <CounterBtn onClick={() => props.reduceCountAction(2)}>-</CounterBtn>
      <CounterDisplay></CounterDisplay>
      <CounterBtn onClick={() => props.addCountAction(2)}>+</CounterBtn>

      <hr />
      <button onClick={turnToImmuteablePage}>跳转immuteable</button>
    </div>
  );
};

export default connect(null, { addCountAction, reduceCountAction })(ReduxDdemo);
