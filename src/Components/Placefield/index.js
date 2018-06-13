import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
    <div className="autocomplete-root">
        <input {...getInputProps()} />
        <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => (
                <div {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                </div>
            ))}
        </div>
    </div>
)

const handleSelect = (address) => {
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
            store.dispatch(changeCenter({ lat, lng })),
            console.log(store.getState())
        )
}

const PlaceField = ({
    input,
    label,
    meta: { touched, error },
    ...rest
}) => {
    const hasError = touched && error
    const id = input.name
    return <div>
        <label>{label}</label>
        <PlacesAutocomplete id={id} {...input} {...rest} typeAhead={false} inputName={input.name} onSelect={handleSelect}>
            {renderFunc}
        </PlacesAutocomplete>
    </div>
}

export default PlaceField