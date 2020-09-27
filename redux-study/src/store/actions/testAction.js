import actionType from './actionType'

export const testAction = (value) => {
  return {
    type: actionType.TEST_ACTION,
    payload: {
      value
    }
  }
}