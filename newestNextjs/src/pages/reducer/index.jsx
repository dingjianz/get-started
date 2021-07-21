/* eslint-disable no-shadow */
import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { SelfHeader, Button } from '@components';
import { addCountAction, reduceCountAction } from '@store/actions/countActions';

import styles from './index.module.scss';

const PageReducer = ({ count, addCountAction, reduceCountAction }) => {
  return (
    <>
      <SelfHeader title="reduce demo" />
      <div className={styles.reducer}>
        <p>
          count:
          {count}
        </p>
        <Button className={styles.opreate_btn} onClick={addCountAction}>
          +
        </Button>
        <Button className={styles.opreate_btn} onClick={reduceCountAction}>
          -
        </Button>

        <Link href="/reducer/countDetail">
          <Button className={styles.opreate_btn}>countDetail</Button>
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.countReducer.count,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCountAction: () => dispatch(addCountAction()),
//     reduceCountAction: () => dispatch(reduceCountAction()),
//   };
// };

export default connect(mapStateToProps, {
  addCountAction,
  reduceCountAction,
})(PageReducer);
