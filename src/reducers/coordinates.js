import { SEND_COORDINATES } from '../actions'

const initialState = {
    lat: 0,
    lng: 0
}

export const coordinatesReducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_COORDINATES:
        return Object.assign({}, state, {lat: action.payload.latLng.lat, lng: action.payload.latLng.lng})
        default:
        return state
    }
}
