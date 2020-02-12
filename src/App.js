import React from 'react';
import './App.css';
import Input from './Components/Input'
import CityResultArea from './Components/CityResultArea'
import MapResultArea from './Components/MapResultArea'


function App() {
  return (
    <div className="App">
      <Input></Input>
      <div className="row">
        <CityResultArea></CityResultArea>
        { <MapResultArea></MapResultArea>  }
      </div>
    </div>
  );
}

export default App;
