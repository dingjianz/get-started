import { createWithEqualityFn } from 'zustand/traditional';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initalValue = {
  fish: 0,
};

const useFoodStore = createWithEqualityFn<typeof initalValue>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          () => ({
            fish: 0,
          }),
          {
            name: 'food store',
          }
        )
      ),
      {
        name: 'food store',
        enabled: true,
      }
    )
  )
);

const addOneFish = () =>
  useFoodStore.setState((state) => {
    state.fish++;
  });

const removeOneFish = () =>
  useFoodStore.setState((state) => {
    state.fish > 0 ? state.fish-- : (state.fish = 0);
  });

const removeAllFish = (value: number) => useFoodStore.setState({ fish: value });

export { useFoodStore, addOneFish, removeOneFish, removeAllFish };
