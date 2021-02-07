const constants = {

  // Unit labels for various measurement standards
  UNIT_LABELS: {
    metric: {
      temp: '°C',
      speed: 'meter/sec'
    },
    imperial: {
      temp: '°F',
      speed: 'miles/hour'
    },
    standard: {
      temp: 'K',
      speed: 'meter/sec'
    }
  },

  // Predefined city data for menu
  CITY_OPTIONS: [
    {
      value: '6167865',
      name: 'Toronto, CA'
    }, {
      value: '6094817',
      name: 'Ottawa, CA'
    }, {
      value: '1850147',
      name: 'Tokyo, JP'
    }
  ],

  // Units data for menu
  UNIT_OPTIONS: [
    {
      value: 'metric',
      name: 'Metric (°C, meter/sec)'
    }, {
      value: 'imperial',
      name: 'Imperial (°F, miles/hour)'
    }, {
      value: 'standard',
      name: 'Standard (K, meter/sec)'
    }
  ],

  // Headers for forecast table
  FORECAST_HEADERS: [
    'Date',
    'Temp',
    'Min Temp',
    'Max Temp',
    'Wind',
    'Description'
  ],

  // Titles and content
  APP_TITLE: 'Weather App',
  APP_SUB_TITLE: 'Please select your city and unit preference.',
  WIND_LABEL: 'Wind'
};

export default constants;