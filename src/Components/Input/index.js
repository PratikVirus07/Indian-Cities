import React, { Component } from 'react'
import {stateArray} from '../StateStore/StateList'
import {connect} from 'react-redux'
import {stateChange, locationChange, cityChange, zoomLevel, mapCenter, loadingStatus} from '../../Redux/actionCreator'
import'./style.css'

let locationArray = [];

class input extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             initialStateValue : "Chose State"
        }
    }
    

    selectState = async event => {

        this.setState({
            initialStateValue:event.target.value
        })

        locationArray = [];
        let selectedState = event.target.value;
        this.props.stateChange(selectedState)
        this.props.loadingStatus(true)
        await this.getState(selectedState)
        this.props.zoomLevel(7)

        try{
            const cityData = await this.getCities(selectedState)
            const citiesJSON = await cityData.json();
            this.props.cityChange(citiesJSON)
            for(let i=0; i<30; i++){
                await this.getLocation(citiesJSON[i])
            }
            this.props.locationChange(locationArray)
            this.props.loadingStatus(false);
        } catch (error) {
            console.log(error)
        }
    }

    getState = async state => {
        const data = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${state},India&key=AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs`)
        const jsonData = await data.json();
        const location = jsonData.results[0].geometry.location;
        this.props.mapCenter(location)
    }

    getCities = async state => {
        return fetch(`https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${state}`);
    }

    getLocation = async city => {
        if (city === undefined) {
            console.log(city.City, "undefined");
            return;
        }
        const data = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city.City},${city.State}&key=AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs`
        );
        const json = await data.json();
        console.log(json);
        const location = json.results[0].geometry.location;
        console.log(location);
        locationArray.push({
        name: city.City,
        location: location
        });
    }

    render() {
        return (
            <div className="dropdown m-2 myInput">
                <select value={this.state.initialStateValue} onChange={this.selectState} className='btn btn-light dropdown-toggle'>
                    <option value="state">
                        Choose State
                    </option>
                    {
                        stateArray.map(state => (
                            <option key={state} value={state} className="dropdown-item">  
                                {state}
                            </option>
                        ))
                    }
                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        selectedState : state.selectedState,
        cities : state.cities,
        cityLocations : state.cityLocations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        stateChange : userStateSelection => {
            dispatch(stateChange(userStateSelection))
        },
        cityChange : cities => {
            dispatch(cityChange(cities))
        },
        locationChange : locationArray => {
            dispatch(locationChange(locationArray))
        },
        zoomLevel : level => {
            dispatch(zoomLevel(level))
        },
        mapCenter : center => {
            dispatch(mapCenter(center))
        },
        loadingStatus : status => {
            dispatch(loadingStatus(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (input)
