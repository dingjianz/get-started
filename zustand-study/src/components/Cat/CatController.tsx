import useCatStore from 'stores/catStore';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

const CatController = () => {
  // const { increaseBigCats, increaseSmallCats } = useCatStore();
  // const increaseBigCats = useCatStore.use.increaseBigCats();
  // const increaseSmallCats = useCatStore.use.increaseSmallCats();

  // 可以一次性获取多个值
  // const { increaseBigCats, increaseSmallCats } = useCatStore(
  //   (state) => ({
  //     increaseBigCats: state.increaseBigCats,
  //     increaseSmallCats: state.increaseSmallCats,
  //   }),
  //   shallow // 不加点击按钮会重渲染
  // );

  // 可以一次性获取多个值
  const [increaseBigCats, increaseSmallCats] = useCatStore(
    (state) => [state.increaseBigCats, state.increaseSmallCats],
    shallow // 不加点击按钮会重渲染
  );

  return (
    <div className={styles.box}>
      <h1>CatController</h1>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
        <button onClick={increaseSmallCats}>add small cats</button>
      </div>
      <p>{Math.random()}</p>
    </div>
  );
};

export default CatController;
