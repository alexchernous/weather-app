import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './lib/styles/App.css';
import constants from './lib/constants';
import config from './config/weather';
import Menu from './components/Menu';
import ForecastTable from './components/ForecastTable';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  }
}));

const App = () => {
  const classes = useStyles();
  const [cityId, setCityId] = useState('');
  const [units, setUnits] = useState('metric');
  const [weatherObject, setWeather] = useState(null);
  const [forecast, setForecast] = useState('');
  const [isForecastShown, setShowForecast] = useState(false);

  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };

  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };

  const toggleForecast = () => {
    setShowForecast(isForecastShown => !isForecastShown);
  };

  useEffect(() => {
    if (cityId) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${units}&appid=${config.appid}`)
        .then(res => { setWeather(res.data) })
        .catch(error => { console.log(error) });
      // TODO: maybe give control of this call to ForecastTable
      // potentially might solve unnecessary call if forecast isn't expanded...
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=${units}&appid=${config.appid}`)
        .then(res => { setForecast(res.data) })
        .catch(error => { console.log(error) });
    }
  }, [cityId, units]);

  const menus = [
    {
      title: 'City',
      value: cityId,
      options: constants.cityOptions,
      handleChange: handleCityChange
    }, {
      title: 'Units',
      value: units,
      options: constants.unitOptions,
      handleChange: handleUnitsChange
    }
  ];

  const renderMenus = menus.map((menu) => (
    <React.Fragment key={menu.title}>
      <FormControl variant='outlined' className={classes.formControl}>
        <Menu
          menuOptions={menu.options}
          title={menu.title}
          value={menu.value}
          handleChange={menu.handleChange} />
      </FormControl>
    </React.Fragment>
  ));

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <h3>Please select your city and unit preference.</h3>
      {renderMenus}
      {weatherObject &&
        <div>
          <h4>{weatherObject.weather[0].main}</h4>
          <p>{weatherObject.weather[0].description}</p>
          <h4>{weatherObject.main.temp + ' ' + constants.unitLabels[units].temp}</h4>
          <p>{'Wind ' + weatherObject.wind.speed + ' ' + constants.unitLabels[units].speed}</p>
          <div>
            {!isForecastShown &&
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={toggleForecast}
              >
                See Forecast
              </Button>
            }
          </div>
        </div>
      }
      {isForecastShown &&
        <React.Fragment>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={toggleForecast}
          >
            Close Forecast
          </Button>
          <ForecastTable forecast={forecast} units={units} />
        </React.Fragment>
      }
    </div>
  );
}

export default App;
