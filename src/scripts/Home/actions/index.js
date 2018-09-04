import axios from 'axios'

export const fetchNearbyPlaces = () => (dispatch) => {
  const apiUrl = 'https://api.myjson.com/bins/qhnfp'
  dispatch({
    type: 'GET_PLACES_REQUEST'
  })

  return axios({
    url: apiUrl,
    method: 'GET'
  })
    .then((response) => {
      dispatch({
        type: 'GET_PLACES_SUCCESS',
        products: response.data
      })
    }).catch(() => {
      dispatch({
        type: 'GET_PLACES_FAILURE'
      })
    })
}
