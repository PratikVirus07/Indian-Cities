import React, { Component } from 'react'
import {connect} from 'react-redux'
import './style.css'

class CityResult extends Component {
    render() {
        const {cities} = this.props

        return (
            <div className="col col-md-12 col-lg-6 border cities">
                <div className="myState">
                    {this.props.selectedState?
                        this.props.selectedState
                        :"STATE"
                    }
                </div>
                <ul className="list-group">
                    {cities.map((city, index) => (
                        <li className="myCityList" key={index}>
                            {city.City}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        cities : state.cities,
        selectedState : state.selectedState
    }
}

export default connect(mapStateToProps) (CityResult)
