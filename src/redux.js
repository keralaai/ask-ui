import { createStore } from 'redux'

export const initialState = {
  user: null,
  threads: []
}

function jsonToList(data) {
  let list = []
  for (var i in data) {
    list.push({ id: i, data: data[i] })
  }
  return list
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_CHANGED':
      state = {
        ...state,
        user: action.payload
      }
      break
    case 'FIREBASE_THREAD_CHANGE':
      state = {
        ...state,
        threads: jsonToList(action.payload)
      }
      break
    default:
      state = { ...state }
  }
  return state
}

const store = createStore(reducer)
export default store
