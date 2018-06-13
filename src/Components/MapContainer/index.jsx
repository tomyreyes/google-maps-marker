import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Mark  from '../Mark'
import { connect } from 'react-redux'

const mapBoxToken =
    'pk.eyJ1IjoidG9teTE0MyIsImEiOiJjamZ5Z3M4YjIwMXNtMzNueHVwMGd6dTloIn0.z_yPSWapeXLaixPPUcpI-A'

class MapContainer extends Component {
    constructor(){
        super()
        this.state = {
            viewport: {
                latitude: 49.2827291, 
                longitude: -123.12073750000002, 
                height: 1200, 
                width: 1880, 
                zoom: 13, 
                bearing: 0, 
                pitch: 0 
            } 
        }

    }

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || window.innerWidth,
                height: this.props.height || window.innerHeight
            }
        });
    };

    _onViewportChange = (viewport)  => {
        this.setState({
            viewport: { ...viewport},
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.latLng !== this.props.latLng) {
            this.setState({
               viewport: {
                   ...this.state.viewport, 
                   latitude: this.props.latLng.lat,
                   longitude: this.props.latLng.lng,
                   zoom: 15
               }
            })
        }
    }
    _renderMarker = () => {
        return (
            <Marker longitude={this.props.latLng.lng} latitude={this.props.latLng.lat} >
                <Mark size={20} />
            </Marker>
        );
    }

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapStyle={'mapbox://styles/mapbox/streets-v9'}
                mapboxApiAccessToken={mapBoxToken}
                onViewportChange={this._onViewportChange}
            >
            {this._renderMarker()}
                </ReactMapGL>
        )
    }
}

const mapStateToProps = state => {
    return {
        latLng: state.coordinatesReducer
    }
}

export default connect(mapStateToProps)(MapContainer)