import React from 'react';
import CEPForm from './components/CEPForm';
import LoginForm from './components/LoginForm';
import LocationMap from './components/LocationMap';

function App() {
  return (
    <div>
      <h1>Bem-vindo ao Portal</h1>
      <h2>Consulta de CEP</h2>
      <CEPForm />
      <h2>Login</h2>
      <LoginForm />
      <h2>Geolocalização</h2>
      <LocationMap />
    </div>
  );
}

export default App;
