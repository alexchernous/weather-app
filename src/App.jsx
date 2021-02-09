import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import './lib/styles/App.css';
import constants from './lib/constants';
import config from './config/weather';
import Menu from './components/Menu';
import ForecastTable from './components/ForecastTable';
import MoreWeatherDetails from './components/MoreWeatherDetails';
import ComfortableWeather from './components/ComfortableWeather';
import WeatherAnalysis from './components/WeatherAnalysis';
import AuthenticationErrorMessage from './components/AuthenticationErrorMessage';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  weatherResults: {
    display: 'flex'
  },
  weatherMetrics: {
    marginRight: '30px'
  },
  qualitativeWeather: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '30px',
    marginTop: '20px'
  },
  weatherDivider: {
    marginTop: '20px'
  },
}));

const App = () => {
  const classes = useStyles();
  const [cityId, setCityId] = useState('');
  const [units, setUnits] = useState('metric');
  const [weatherObject, setWeather] = useState(null);
  const [forecast, setForecast] = useState('');
  const [isForecastShown, setShowForecast] = useState(false);
  const [isAuthenticationError, setAuthenticationError] = useState(false);

  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };

  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };

  const toggleForecast = () => {
    setShowForecast(isForecastShown => !isForecastShown);
  };

  // Fetch API data on select menu change
  useEffect(() => {
    if (cityId) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${units}&appid=${config.appid}`)
        .then(res => { setWeather(res.data) })
        .catch(error => {
          if (error.response) {
            setAuthenticationError(error.response.status === 401);
          }
        });

      /**
       * Potentially unnecessary call if forecast isn't expanded.
       *
       * Since we don't know if user will need/open forecasts,
       * we might just be putting an
       * unnecessary load on the browser.
       *
       */
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=${units}&appid=${config.appid}`)
        .then(res => { setForecast(res.data) })
        .catch(error => {
          if (error.response) {
            setAuthenticationError(error.response.status === 401);
          }
        });
    }
  }, [cityId, units]);

  // Menu data
  const menus = [
    {
      title: 'City',
      value: cityId,
      options: constants.CITY_OPTIONS,
      handleChange: handleCityChange
    }, {
      title: 'Units',
      value: units,
      options: constants.UNIT_OPTIONS,
      handleChange: handleUnitsChange
    }
  ];

  // Select menus
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
      {/* Title */}
      <h1>{constants.APP_TITLE}</h1>
      <h3>{constants.APP_SUB_TITLE}</h3>

      {/* Menus */}
      {renderMenus}

      {/* Reminder to include appid in config */}
      {isAuthenticationError && !weatherObject &&
        <AuthenticationErrorMessage />
      }

      {/* Weather content */}
      {!isAuthenticationError && weatherObject &&
        <div>
          <div className={classes.weatherResults}>
            <div className={classes.weatherMetrics}>
              <h4>{weatherObject.weather[0].main}</h4>
              <p>{weatherObject.weather[0].description}</p>
              <h4>
                {
                  weatherObject.main.temp
                  + ' ' +
                  constants.UNIT_LABELS[units].temp
                }
              </h4>
              <p>
                {
                  constants.WIND_LABEL
                  + ' ' +
                  weatherObject.wind.speed
                  + ' ' +
                  constants.UNIT_LABELS[units].speed
                }
              </p>
            </div>
            <Divider orientation='vertical' flexItem className={classes.weatherDivider} />

            {/* Qualitative weather stuff */}
            <div className={classes.qualitativeWeather}>
              <MoreWeatherDetails
                units={units}
                temp={weatherObject.main.temp}
                feelsLike={weatherObject.main.feels_like}
                wind={weatherObject.wind.speed}
                humidity={weatherObject.main.humidity}
              />
              <ComfortableWeather units={units} />
              <WeatherAnalysis
                units={units}
                temp={weatherObject.main.feels_like}
                wind={weatherObject.wind.speed}
                humidity={weatherObject.main.humidity}
              />
            </div>
          </div>

          {/* See Forecast button */}
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

      {/* Render forecast data table with Close Forecast button */}
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
