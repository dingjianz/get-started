import { memo } from 'react';
import BearBox from 'components/Bear/BearBox';
import CatBox from 'components/Cat/CatBox';
import CatBox2 from 'components/Cat/CatBox2';
import CatController from 'components/Cat/CatController';
import FoodBox from 'components/Food/FoodBox';

import styles from './index.module.scss';

const PageZustand = memo(() => {
  return (
    <div className={styles.container}>
      <div>
        <BearBox />
        <FoodBox />
      </div>
      <div>
        <CatBox />
        <CatBox2 />
        <CatController />
      </div>
    </div>
  );
});

export default PageZustand;
