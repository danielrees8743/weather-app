const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//? Define paths or Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//? Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//? Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Daniel',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Daniel',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message:
      'This is the help section, if you need help open the window and shout help!😭',
    title: 'Help',
    name: 'Daniel',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must supply an address field' });
  }
  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    console.log(location);

    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      console.log(forecastData);
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Daniel',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Daniel',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(chalk.blue(`Server is listening on port ${port}...`));
});
