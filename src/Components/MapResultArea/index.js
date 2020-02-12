import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import {connect} from 'react-redux'
import Marker from "../Marker/index"
import Loader from "react-loader-spinner"
import './style.css'
//  import {Marker} from 'react-google-maps'


class MapResult extends Component {

    render() {
        return (
            <div  className="col-12 col-md-12 col-lg-6 border mapArea">
                {
                    this.props.isLoading ? 
                    (
                        <Loader 
                        className="loader"
                        type="TailSpin"
                        color="#0f4c75"
                        height={150}
                        width={150}
                        timeout = {10000}
                        />
                    )
                    :null
                }    
                    <GoogleMapReact
                         bootstrapURLKeys={{ key: "AIzaSyAUdQnLlhEULAQ9DQhUZrEDeZZR28Z5FGs" }}
                        center={{
                            lat: this.props.mapCenter.lat,
                            lng: this.props.mapCenter.lng
                        }}
                        zoom={this.props.zoomLevel}
                    >
                    {this.props.cityLocations != null
                        ? this.props.cityLocations.map(loc => (
                            <Marker
                            key={loc.name}
                            id={loc.name}
                            lat={loc.location.lat}
                            lng={loc.location.lng}
                            name={loc.name}
                            color="#f0134d"
                            />
                    ))
                    : console.log("Empty")}
            </GoogleMapReact>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        cities: state.cities,
        zoomLevel: state.zoomLevel,
        mapCenter: state.mapCenter,
        cityLocations: state.cityLocations,
        isLoading: state.isLoading
    }
}

export default connect (mapStateToProps) (MapResult)
