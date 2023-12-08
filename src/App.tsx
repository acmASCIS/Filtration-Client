import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import RoundedInput from './components/reusable/input/Input';
import ConfigurationForm from './components/configuartionForm/ConfigurationForm';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <ConfigurationForm></ConfigurationForm>
    </div>
  );
}

export default App;
