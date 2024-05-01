import { useFoodStore } from 'stores/foodStore';

export const testZustand = () => {
  console.log(useFoodStore.getState().fish);
};
