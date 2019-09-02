export const filterAction = (query) => {
  return {
    type: 'SET_FILTER',
    query
  }
}

const filterReducer = (state = '', {type, query}) => {
  switch(type) {
    case 'SET_FILTER':
      return query;
    default:
      return state;
  }
}

export default filterReducer;