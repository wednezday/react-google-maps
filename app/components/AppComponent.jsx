
import React from 'react';
import ReactDOM from 'react-dom';

import { camelize } from './../librarys/String';
import { ScriptCache } from './../librarys/ScriptCache';
import GoogleApi from './../librarys/GoogleApi';

let step = 1;

const evtNames = [ 'ready', 'click', 'dragend', 'recenter' ];
const defaultMapConfig = {}
const defaultCreateCache = (options) => {
    options = options || {};
    const apiKey = options.apiKey || 'AIzaSyDoAfBvxsubckl8HOkt4Q8MnoJh4BJNJqI';
    const libraries = options.libraries || ['places'];
    return ScriptCache({
        google: GoogleApi({ apiKey: apiKey, libraries: libraries, language: 'th' })
    });
};

const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
}

class AppComponent extends React.Component {

  constructor(props, context) {

    super(props, context);

    console.log('AppComponent: #' + step + ' constructor()');
    step++;

    this.scriptCache = defaultCreateCache();
    this.scriptCache.google.onLoad(this.onLoad.bind(this));

    this.listeners = {};
    this.state = {
      loaded: true,
      map: null,
      setting: {
        zoom: 14,
        initialCenter: {
          lat: 37.774929,
          lng: -122.419416
        },
        center: {},
        centerAroundCurrentLocation: false,
        style: {},
        containerStyle: {},
        visible: true
      },
      google: null
    }

  }

  componentWillMount() {
    console.log('AppComponent: #' + step + ' componentWillMount()');
    step++;
  }

  componentDidMount() {
    console.log('AppComponent: #' + step + ' componentDidMount()');
    step++;
  }

  onLoad(err, tag) {

    console.log('AppComponent: #' + step + ' onLoad()');
    step++;

    const refs = this.refs;
    const mapRef = refs.map;
    const maps = window.google.maps;

    const node = ReactDOM.findDOMNode(mapRef);
    let center = new maps.LatLng(this.state.setting.initialCenter.lat, this.state.setting.initialCenter.lng)

    let mapConfig = Object.assign({}, defaultMapConfig, {
      center, zoom: this.state.setting.zoom
    })

    this.map = new maps.Map(node, mapConfig);

    evtNames.forEach(e => {
      this.listeners[e] = this.map.addListener(e, this.handleEvent(e));
    });

    maps.event.trigger(this.map, 'ready');

    this.setState({
      loaded: true,
      map: this.map,
      setting: {
        zoom: 14,
        initialCenter: {
          lat: 37.774929,
          lng: -122.419416
        }
      },
      google: window.google
    });

    console.log(this.state);

  }

  handleEvent(evtName) {

    console.log('AppComponent: #' + step + ' handleEvent()');
    step++;

    let timeout;
    const handlerName = `on${camelize(evtName)}`

    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }

  }

  render() {

    console.log('AppComponent: #' + step + ' render()');
    step++;

    const style = Object.assign({}, mapStyles.map, this.props.style, {
        display: 'inherit'
    });

    return (
      <div style={mapStyles.container} >
        <div style={style} ref='map'>
          Loading map...
        </div>
      </div>
    );

  }

}

export default AppComponent;
