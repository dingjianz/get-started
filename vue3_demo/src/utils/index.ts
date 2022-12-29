const removeFromArray = <T>(array: Array<T>, index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
const replaceFromArray = <T>(array: Array<T>, index: number, newVal: T) => {
  return [...array.slice(0, index), newVal, ...array.slice(index + 1)];
};
const addFromArray = <T>(array: Array<T>, index: number, newVal: T) => {
  return [...array.slice(0, index), newVal, ...array.slice(index)];
};

export {
  removeFromArray,
  replaceFromArray,
  addFromArray
};
