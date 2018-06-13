export const SEND_COORDINATES = 'SEND_COORDINATES'


export const sendCoordinates = (coords) => {
    return {
        type: SEND_COORDINATES,
        payload: coords
    }
}

