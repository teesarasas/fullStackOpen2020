export const setFilter = (filter) => {
  return {
    type: 'SET_WORD',
    data: { filter }
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_WORD':
      return action.data.filter
    default: return state
  }
}

export default filterReducer