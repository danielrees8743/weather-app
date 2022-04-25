const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ab25feff94b41a1108dbab211e2e2d08&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    const {
      weather_descriptions: description,
      temperature,
      feelslike,
    } = body.current;
    if (error) {
      callback('Unable to connect ot weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(
        undefined,
        `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
