import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherChart from '../components/weather_chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {



  renderWeather(cityData) {

    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const hums = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat}/></td>
        <td>{cityData.city.country}</td>
        <td><WeatherChart data={temps} color="magenta" units="K"/></td>
        <td><WeatherChart data={pressures} color="green" units="hPa"/></td>
        <td><WeatherChart data={hums} color="blue" units="%"/></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Temperature (K)</th>
            <th scope="col">Pressure (hPa)</th>
            <th scope="col">Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);