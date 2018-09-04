const initialState = {
  places: [],
  isLoading: false
}

const places = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLACES_REQUEST':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_PLACES_SUCCESS':
      return {
        ...state,
        places: action.places,
        isLoading: false
      }
    case 'GET_PLACES_FAILURE':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default places
