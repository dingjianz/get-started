import createSelectors from 'utils/createSelectors';
// import { create } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { StateCreator } from 'zustand';

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => string;
};

const createCatSlice: StateCreator<
  TCatStoreState,
  [
    ['zustand/immer', never],
    ['zustand/devtools', unknown],
    ['zustand/subscribeWithSelector', never],
    ['zustand/persist', unknown],
  ]
> = (set, get) => ({
  cats: {
    bigCats: 0,
    smallCats: 0,
  },
  increaseBigCats: () =>
    set((state) => {
      state.cats.bigCats++;
    }),
  increaseSmallCats: () =>
    set((state) => {
      state.cats.smallCats++;
    }),
  summary: () => {
    // 通过get函数获取state
    const total = get().cats.bigCats + get().cats.smallCats;
    return `总共有 ${total} 只猫`;
  },
});
// const useCatStore = create<TCatStoreState>()((set) => ({
//   cats: {
//     bigCats: 0,
//     smallCats: 0,
//   },
//   increaseBigCats: () =>
//     set((state) => ({
//       cats: {
//         ...state.cats,
//         bigCats: state.cats.bigCats + 1,
//       },
//     })),
//   increaseSmallCats: () =>
//     set((state) => ({
//       cats: {
//         ...state.cats,
//         smallCats: state.cats.smallCats + 1,
//       },
//     })),
// }));

// const useCatStore = create<TCatStoreState>()(
const useCatStore = createWithEqualityFn<TCatStoreState>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(createCatSlice, {
          name: 'cat store',
        })
      ),
      {
        enabled: true,
        name: 'cat store',
      }
    )
  )
);

// export default useCatStore;
export default createSelectors(useCatStore);
