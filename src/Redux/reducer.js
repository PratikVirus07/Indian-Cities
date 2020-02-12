import { STATE_CHANGE, CITIES_CHANGE, LOCATION_CHANGE, ZOOM_LEVEL, MAP_CENTER, LOADING_STATUS} from './actionType'

const initialState = {
    selectedState : "",
    cities : [],
    cityLocations : [],
    zoomLevel : 4.8,
    mapCenter : {lat: 28.7040592, lng: 77.10249019999999},
    isLoading : false
}

const reducer = (state=initialState, action) => {
    switch(action.type){

        case STATE_CHANGE : return {
            ...state,
            selectedState: action.payload
        }

        case CITIES_CHANGE : return {
            ...state,
            cities: action.payload
        }

        case LOCATION_CHANGE : return {
            ...state,
            cityLocations: action.payload
        }

        case ZOOM_LEVEL : return {
            ...state,
            zoomLevel: action.payload
        }

        case MAP_CENTER : return {
            ...state,
            mapCenter: action.payload
        }

        case LOADING_STATUS : return {
            ...state,
            isLoading: action.payload
        }
        
        default:  return state
    }
}

export default reducer;