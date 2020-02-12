import { STATE_CHANGE, CITIES_CHANGE, LOCATION_CHANGE, ZOOM_LEVEL, MAP_CENTER, LOADING_STATUS} from './actionType'

export const stateChange = (userStateSelection) => {
    return{
        type: STATE_CHANGE,
        payload: userStateSelection
    }
}

export const cityChange = (cities) => {
    return{
        type: CITIES_CHANGE,
        payload: cities
    }
}
export const locationChange = (locationArray) => {
    return{
        type: LOCATION_CHANGE,
        payload: locationArray
    }
}

export const zoomLevel = (level) => {
    return{
        type: ZOOM_LEVEL,
        payload: level
    }
}

export const mapCenter = (center) => {
    return{
        type: MAP_CENTER,
        payload: center
    }
}

export const loadingStatus = (status) => {
    return{
        type: LOADING_STATUS,
        payload: status
    }
}