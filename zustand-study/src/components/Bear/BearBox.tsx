import { useEffect, useState } from 'react';
import useBearStore from 'stores/bearStore';
import { useFoodStore } from 'stores/foodStore';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

const BearBox = () => {
  // const bears = useBearStore((state) => state.bears);
  // const increasePopulation = useBearStore((state) => state.increasePopulation);
  // const removeAllBears = useBearStore((state) => state.removeAllBears);
  // const updateBears = useBearStore((state) => state.updateBears);

  const { bears, increasePopulation, removeAllBears, updateBears } = useBearStore();

  // const fish = useFoodStore((state) => state.fish); // fish改变 组件就会重渲染

  const [bgColor, setBgColor] = useState<'lightcoral' | 'lightgreen' | undefined>(
    useFoodStore.getState().fish > 5 ? 'lightgreen' : 'lightcoral'
  );

  useEffect(() => {
    // const unsub = useFoodStore.subscribe((state, prevState) => {
    //   if (prevState.fish <= 5 && state.fish > 5) {
    //     setBgColor('lightgreen');
    //   } else if (prevState.fish > 5 && state.fish <= 5) {
    //     setBgColor('lightcoral');
    //   }
    // });

    // 订阅某个值的状态
    const unsub = useFoodStore.subscribe(
      (state) => state.fish,
      (fish, preFish) => {
        // 第一次加载
        // if (fish === preFish) {
        //   if (fish > 5) {
        //     setBgColor('lightgreen');
        //   } else {
        //     setBgColor('lightcoral');
        //   }
        // }
        if (preFish <= 5 && fish > 5) {
          setBgColor('lightgreen');
        } else if (preFish > 5 && fish <= 5) {
          setBgColor('lightcoral');
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true, // 默认false 是否立即执行
      }
    );
    return unsub;
  }, []);

  return (
    <div
      className={styles.box}
      style={{
        // backgroundColor: `${fish > 5 ? 'lightgreen' : 'lightcoral'}`,
        backgroundColor: bgColor,
      }}
    >
      <h1>Bear Box</h1>
      <p>bears: {bears}</p>
      <div>
        <button onClick={increasePopulation}>add bear</button>
        <button onClick={removeAllBears}>remove bear</button>
        <button onClick={updateBears.bind(this, 6)}>update bear</button>
      </div>
      <p>{Math.random()}</p>
    </div>
  );
};

export default BearBox;
