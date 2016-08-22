import React from 'react';
import { render } from 'react-dom';

import AppComponent from './components/AppComponent.jsx';

class Application extends React.Component {
  render () {
    return (
      <div>
        <p> REACT + Google Maps By CoachMax! </p>
        <AppComponent />
      </div>
    );
  }
}

render(<Application/>, document.getElementById('app'));
