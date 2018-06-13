import React, { Component } from 'react';

import { MapContainer, SearchBar } from './Components'
class App extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Google Maps</h1>
        <SearchBar/>
        <MapContainer/>
        </div>
    );
  }
}

export default App;
