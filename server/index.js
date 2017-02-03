require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const sass = require("node-sass-middleware");

const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger  = require('knex-logger');

app.use(morgan('dev'));
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession( {
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.get('/apps', (request, response) => {
  knex
  .select('name', 'description', 'price')
  .from('items')
  .where('food_type_id', 1)
  .then((results) => {
    response.json(results);
  });
});

app.get('/mains', (request, response) => {
  knex
  .select('name', 'description', 'price')
  .from('items')
  .where('food_type_id', 2)
  .then((results) => {
    response.json(results);
  });
});

app.get('/desserts', (request, response) => {
  knex
  .select('name', 'description', 'price')
  .from('items')
  .where('food_type_id', 3)
  .then((results) => {
    response.json(results);
  });
});

app.get('/drinks', (request, response) => {
  knex
  .select('name', 'description', 'price')
  .from('items')
  .where('food_type_id', 4)
  .then((results) => {
    response.json(results);
  });
});
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/register', (request, response) => {
  response.redirect('register');
});

app.get('/checkout', (request, response) => {
  response.render('checkout');

});

app.get('/register', (request, response) => {
  response.render('register');
});

app.post('/register/addcust', (request, response) => {
  // Add name and phone number input fields into order table
  response.redirect('checkout');
  return;

});

app.get('/checkout', (request, response) => {
  response.render('checkout');
});

app.post('/checkout', (request, response) => {
  response.redirct('status');
  return;
});

app.get('/status', (request, response) => {
  response.render('status');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});