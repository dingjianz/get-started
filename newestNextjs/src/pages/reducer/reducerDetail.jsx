/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import WithImmutable from '@components/WithImmutable';

const CountDetail = ({ count, number, character }) => {
  return (
    <>
      <h1>count：{count}</h1>
      <h1>持久化number：{number}</h1>
      {/* <h1>持久化character：{character}</h1> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.countReducer?.count ?? 0,
    number: state.numberReducer?.number,
    character: state.numberReducer?.character,
  };
};

export default connect(mapStateToProps, null)(WithImmutable(CountDetail));
