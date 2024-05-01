import { createWithEqualityFn } from 'zustand/traditional';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type IFoodStoreState = {
  fish: number;
  addOneFish: () => void;
  removeOneFish: () => void;
  removeAllFish: () => void;
};

const useFoodStore = createWithEqualityFn<IFoodStoreState>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          (set) => ({
            fish: 0,
            addOneFish: () =>
              set((state) => {
                state.fish++;
              }),
            removeOneFish: () =>
              set((state) => {
                state.fish > 0 ? state.fish-- : (state.fish = 0);
              }),
            removeAllFish: () =>
              set((state) => {
                state.fish = 0;
              }),
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

export default useFoodStore;
