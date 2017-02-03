require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const sass = require("node-sass-middleware");
const path = require("path");

const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger  = require('knex-logger');

app.use(morgan('dev'));
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: path.join(__dirname, "../styles"),
  dest: path.join(__dirname, "../public/styles"),
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

app.use(cookieSession( {
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000
}));

function groupBy(data, column) {
  return data.reduce((acc, i) => {
    if(!acc[i[column]]) {  // if the resulting object doesn't have the thing we're grouping by -
      acc[i[column]] = []; // make it
    }
    acc[i[column]].push(i); // put the item into the bucket under the key we're grouping by
    return acc; // return accumulator for the next iteration of reduce // mandatory
  }, {});
}
app.get('/', (request, response) => {
    knex('items')
    .join('food_types', 'items.food_type_id', 'food_types.id')
    .select('items.name', 'items.description', 'items.price', 'items.food_type_id', 'food_types.name as type_name')
    .then((data) => {
      const grouped = groupBy(data, 'food_type_id');
      response.render('index', { food_types: grouped});
    })
    .catch(ex => {
      res.status(500).json(ex);
    });
});

app.get('/register', (request, response) => {
  response.render('register');
});

app.get('/checkout', (request, response) => {
  knex('orders')
  .join('line_items', 'orders.id', 'line_items.order_id')
  .join('items', 'line_items.item_id', 'items.id')
  .select('orders.cus_name', 'orders.phone', 'line_items.quantity', 'items.name', 'items.price')
  .where('orders.id', 1)
  .then((data) => {
    console.log(data);
    response.render('checkout', {data: data});
    })
  .catch(ex => {
      res.status(500).json(ex);
  });
});


app.post('/register/addcust', (request, response) => {
  // Add name and phone number input fields into order table

  response.redirect('../checkout');
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
