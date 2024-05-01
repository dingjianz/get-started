import { useFoodStore, addOneFish, removeAllFish, removeOneFish } from 'stores/foodStore';
// import { shallow } from 'zustand/shallow';
import { testZustand } from 'utils/index';

import styles from './index.module.scss';

const FoodBox = () => {
  // const { fish, addOneFish, removeAllFish, removeOneFish } = useFoodStore(); // reactive fish是响应式的

  const fish = useFoodStore((state) => state.fish);
  // const fish = useFoodStore.getState().fish; // non-reactive fish不是响应式的
  // const [addOneFish, removeAllFish, removeOneFish] = useFoodStore(
  //   (state) => [state.addOneFish, state.removeAllFish, state.removeOneFish],
  //   shallow
  // );

  const add5Fishs = () => {
    useFoodStore.setState((state) => {
      state.fish += 5;
    });
  };

  return (
    <div className={styles.box}>
      <h1>food Box</h1>
      <p>fish: {fish}</p>
      <div>
        <button onClick={addOneFish}>add one fish</button>
        <button onClick={removeOneFish}>remove one fish</button>
        <button onClick={removeAllFish.bind(this, 0)}>remove all fish</button>
        <button onClick={add5Fishs}>add 5 fishs</button>
        <button onClick={testZustand}>testZustand plain javascript也就是react外也能获取状态</button>
      </div>
      <p>{Math.random()}</p>
    </div>
  );
};

export default FoodBox;
