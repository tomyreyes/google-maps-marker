export const SEND_COORDINATES = 'SEND_COORDINATES'

export const sendCoordinates = (coords) => {
    return {
        action: SEND_COORDINATES,
        payload: coords
    }
}