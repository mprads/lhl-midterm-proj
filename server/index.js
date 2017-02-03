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

function groupBy(data, column) {
  return data.reduce((acc, i) => {
    if(!acc[i[column]]) {  // if the resulting object doesn't have the thing we're grouping by -
      acc[i[column]] = []; // make it
    }
    acc[i[column]].push(i); // put the item into the bucket under the key we're grouping by
    return acc; // return accumulator for the next iteration of reduce // mandatory
  }, {});
}

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

app.get('/', (request, response) => {
    knex('items')
    .select('name', 'description', 'price', 'food_type_id')
    .then((data) => {

      const grouped = groupBy(data, 'food_type_id');
      // response.json(grouped);
      response.render('index', { food_types: grouped });
    })
    .catch(ex => {
      res.status(500).json(ex);
    });
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
