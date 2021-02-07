const constants = {
  unitLabels: {
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
  cityOptions: [
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
  unitOptions: [
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
  forecastTableHeaders: [
    'Date',
    'Temp',
    'Min Temp',
    'Max Temp',
    'Wind',
    'Description'
  ]
};

export default constants;