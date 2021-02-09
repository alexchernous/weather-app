// Arbitrary weather qualities
const isItWindy = (windSpeed) => windSpeed > 5;

const isItHumid = (humidity) => humidity > 70;

const isItDry = (humidity) => humidity < 30;

const isHumidityPerfect = (humidity) => (humidity >= 30 && humidity <= 70);

const isItCold = (temp) => temp < 0;

const isItChilly = (temp) => (temp <= 15 && temp >= 0);

const isItHot = (temp) => temp >= 30;

const isTempPerfect = (temp) => (temp > 15 && temp < 30);

const weatherAnalysis = (units, temp, wind, humidity) => {
  var qualitativeWeather = "It's";

  // Convert data to C before doing analysis
  if (units === 'imperial') {
    temp = FtoC(temp);
    wind = MPHtoMSEC(wind);
  } else if (units === 'standard') {
    temp = KtoC(temp);
  }

  // Arbitrary weather analysis "AI"
  if (!isItWindy(wind) && isHumidityPerfect(humidity) && isTempPerfect(temp)) {
    qualitativeWeather += 'perfect outside!';
  } else {
    if (isItWindy(wind)) { qualitativeWeather += ' windy, '; }

    if (isItHumid(humidity)) { qualitativeWeather += ' humid, '; }
    else if (isItDry(humidity)) { qualitativeWeather += ' dry, '; }

    // Analysis is done on 'feels like' temp
    if (isItChilly(temp)) { qualitativeWeather += ' chilly.'; }
    else if (isItCold(temp)) { qualitativeWeather += ' cold.'; }
    else if (isItHot(temp)) { qualitativeWeather += ' hot.'; }

    qualitativeWeather += ' Dress appropriately.';
  }

  return qualitativeWeather;
}

// A bunch of useful conversions for the accordion helper content
const CtoF = (c) => (c * 1.8 + 32);

const CtoK = (c) => c + 273.15;

const KtoC = (k) => k - 273.15;

const FtoC = (f) => ((f - 32) / 1.8);

const MSECtoMPH = (msec) => (msec / 0.44704).toFixed(2);

const MPHtoMSEC = (mph) => (mph * 0.44704).toFixed(2);

module.exports = {
  weatherAnalysis,
  CtoF,
  CtoK,
  MSECtoMPH,
};