
import React from 'react';
import ReactDOM from 'react-dom';

import { camelize } from './../librarys/String';
import { ScriptCache } from './../librarys/ScriptCache';
import GoogleApi from './../librarys/GoogleApi';

// let step = 1;

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

    // console.log('AppComponent: #' + step + ' constructor()');
    // step++;

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
    // console.log('AppComponent: #' + step + ' componentWillMount()');
    // step++;
  }

  componentDidMount() {
    // console.log('AppComponent: #' + step + ' componentDidMount()');
    // step++;
  }

  onLoad(err, tag) {

    // console.log('AppComponent: #' + step + ' onLoad()');
    // step++;

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

    // console.log(this.state);

    /*
    // สร้างจุด Mark
    var marker = new maps.Marker({
      position: { lat: 13.883165, lng: 100.515570 }, // Position ที่ต้องการ
      map: this.map,
      title: 'Click to zoom'
    });
    // กรณี Click ให้ Zoom เท่ากับ 8
    marker.addListener('click', () => {
      this.map.setZoom(8); // Zoom เท่ากับ 8
      this.map.setCenter(marker.getPosition()); // จัด Center ให้กับ Position ที่ต้องการ
    });
    // กรณี มีการเปลี่ยนตำแหน่ง Center ให้กลับไปยังตำแหน่งเดิม
    marker.addListener('center_changed', () => {
      window.setTimeout(() => {
        this.map.panTo(marker.getPosition());
      }, 3000); // ภายใน 3 วินาที
    });
    */

    /*
    // สร้างจุด Mark (ตำแหน่งปัจจุบัน)
    var infoWindow = new maps.InfoWindow({ map: this.map });
    var handleLocationError = (browserHasGeolocation, infoWindow, position) => {
      infoWindow.setPosition(position);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }
    // ดึง Location ปัจจุบัน (สนับสนุน HTML5)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(position);
        infoWindow.setContent('คุณกำลังอยู่ที่นี่!'); // ข้อความแสดงจุด Mark
        this.map.setZoom(13); // Zoom เท่ากับ 13
        this.map.setCenter(position);  // จัด Center ให้กับ Position ที่ต้องการ
        }, () => {
            handleLocationError(true, infoWindow, this.map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow, this.map.getCenter());
    }
    */

    /*
    // ย้ายจุด Mark
    var marker = new maps.Marker({
      position: { lat: 13.7246005, lng: 100.6331108 }, // Position ที่ต้องการ
      map: this.map,
      title: 'Click to zoom'
    });
    // กรณี Click ให้ Zoom เท่ากับ 8
    marker.addListener('click', () => {
      this.map.setZoom(8); // Zoom เท่ากับ 8
      this.map.setCenter(marker.getPosition()); // จัด Center ให้กับ Position ที่ต้องการ
    });
    */

    /*
    // แสดงตัวเลข Zoom (ปัจจุบัน)
    let center = new maps.LatLng(this.state.setting.initialCenter.lat, this.state.setting.initialCenter.lng);
    var infowindow = new maps.InfoWindow({
      content: 'ทดสอบการ Zoom',
      position: center
    });
    // กรณี แสดง Infomation อัตโนมัติ
    infowindow.open(this.map); // แสดง Infomation
    // กรณี แสดง Infomation เมื่อมีการ Click
    this.map.addListener('click', () => {
        infowindow.open(this.map); // แสดง Infomation
    });
    // กรณี มีการเปลี่ยนแปลงค่า Zoom (ปัจจุบัน)
    this.map.addListener('zoom_changed', () => {
      infowindow.setContent('Zoom: ' + this.map.getZoom()); // แสดงตัวเลข Zoom (ปัจจุบัน)
    });

    */

  }

  handleEvent(evtName) {

    // console.log('AppComponent: #' + step + ' handleEvent()');
    // step++;

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

    // console.log('AppComponent: #' + step + ' render()');
    // step++;

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
