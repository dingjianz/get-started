import React from "react";
import { connect } from "react-redux";
import { SelfHeader, Button } from "@components";

import styles from "./index.module.scss";

const PageReducer = ({ count }) => {
  return (
    <>
      <SelfHeader title="reduce demo" />
      <div className={styles.reducer}>
        <p>count: {count}</p>
        <Button className={styles.opreate_btn}>+</Button>
        <Button className={styles.opreate_btn}>-</Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.countReducer.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogList: () => dispatch(),
  };
};

export default connect(mapStateToProps, null)(PageReducer);
