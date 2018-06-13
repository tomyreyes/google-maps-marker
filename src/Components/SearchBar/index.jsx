import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendCoordinates } from '../../actions'
import '../../App.css'

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            userInput: '',
            latLng: null
        }
    }

    _handleChange = (userInput) => {
        this.setState({ userInput })
    }

    _handleSelect = (address) => {
        const { latLng } = this.state
        this.setState({userInput:address})
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({latLng})
                this.props.sendCoordinates({latLng})
    })
            .catch(error => console.error('Error', error))
    }

    _handleButtonPress = () => {
        geocodeByAddress(this.state.userInput)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ latLng })
                this.props.sendCoordinates({ latLng })
            })
            .catch(error => console.error('Error', error))
    }

    render(){
        return (
            <div className="map-container">
            <div className="input-group">
            <PlacesAutocomplete
                value={this.state.userInput}
                onChange={this._handleChange}
                onSelect={this._handleSelect}
                
            >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div className={suggestions.length> 0 ? 'dropdown open' : 'dropdown'}>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input form-control'
                            })}
                        />
                        <ul className="autocomplete-dropdown-container dropdown-menu">
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <li {...getSuggestionItemProps(suggestion, { className, style })}>
                                        <a href="#">{suggestion.description}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </PlacesAutocomplete>
            <span className="input-group-btn"><button className="btn btn-success" onClick={this._handleButtonPress}>Search</button></span>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
        return bindActionCreators({
            sendCoordinates
        }, dispatch
    )
}

export default connect(null, mapDispatchToProps)(SearchBar)