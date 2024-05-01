import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type TBearStoreState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
  // getOwner: () => Promise<string>;

  color: string;
  size: string;
};

const useBearStore = create<TBearStoreState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        color: 'red',
        size: 'big',
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
        updateBears: (newBears) => set({ bears: newBears }),
        // getOwner: async () => {
        //   const response = await fetch('https://api.github.com/users/1');
        //   const owner = await response.json();
        //   return owner.name;
        // },
      }),
      {
        name: 'bear persist',
        // storage: createJSONStorage(() => sessionStorage),
        // partialize: (state) => ({ bears: state.bears }), // 保存哪些属性
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !['color', 'size'].includes(key))), // 不保存哪些属性
      }
    ),
    {
      enable: true, // 是否开启redux 浏览器调试工具
      name: 'bear store', // devtools 状态命名
    }
  )
);

export default useBearStore;
