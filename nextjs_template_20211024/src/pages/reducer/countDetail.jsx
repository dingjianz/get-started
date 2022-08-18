/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';

const CountDetail = ({ count }) => <h1>count：{count}</h1>;
const mapStateToProps = (state) => {
  return {
    count: state.countReducer.count,
  };
};

export default connect(mapStateToProps, null)(CountDetail);
