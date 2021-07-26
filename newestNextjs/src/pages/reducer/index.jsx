/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import React from 'react';
import Link from 'next/link';
import WithImmutable from '@components/WithImmutable';
import { connect } from 'react-redux';
import { SelfHeader, Button } from '@components';
import { addCountAction, reduceCountAction } from '@store/actions/countActions';
import {
  addNumberAction,
  reduceNumberAction,
  addCharacterAction,
} from '@store/actions/numberAction';

import styles from './index.module.scss';

const PageReducer = ({
  count,
  number,
  character,
  addCountAction,
  reduceCountAction,
  addNumberAction,
  reduceNumberAction,
  addCharacterAction,
}) => {
  return (
    <>
      <SelfHeader title="reduce demo" />
      <div className={styles.reducer}>
        <div>
          <p>
            count:
            {count}
          </p>
          <Button className={styles.opreate_btn} onClick={addCountAction}>
            count++
          </Button>
          <Button className={styles.opreate_btn} onClick={reduceCountAction}>
            count--
          </Button>
        </div>
        <div className={styles.number}>
          <p>
            持久化number:
            {number}
            {/* &emsp;&emsp; 持久化character:
            {character} */}
          </p>
          <Button className={styles.opreate_btn} onClick={addNumberAction}>
            number++
          </Button>
          <Button className={styles.opreate_btn} onClick={reduceNumberAction}>
            number--
          </Button>
          {/* <Button className={styles.opreate_btn} onClick={addCharacterAction}>
            character+
          </Button> */}
        </div>

        <Link href="/reducer/reducerDetail">
          <Button className={styles.opreate_btn}>reducerDetail</Button>
        </Link>
      </div>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCountAction: () => dispatch(addCountAction()),
//     reduceCountAction: () => dispatch(reduceCountAction()),
//   };
// };

export default connect(mapStateToProps, {
  addCountAction,
  reduceCountAction,
  addNumberAction,
  reduceNumberAction,
  addCharacterAction,
})(WithImmutable(PageReducer));
