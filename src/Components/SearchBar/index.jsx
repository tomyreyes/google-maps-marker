import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendCoordinates } from '../../actions'

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            userInput: '',
            latLng: null
        }
    }

    handleChange = (userInput) => {
        this.setState({ userInput })
    }

    handleSelect = (address) => {
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

  
   


    sendCoordinates = () => {
       
        console.log('hi')
        const { latLng } = this.state
        this.props.sendCoordinates({latLng})
    }

    render(){
        console.log(this.state.latLng)
        return (
            <PlacesAutocomplete
                value={this.state.userInput}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input'
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
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