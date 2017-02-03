const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession( {
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/register', (request, response) => {
  response.render('register');
});

app.post('/register/addcust', (request, response) => {
  // Add name and phone number input fields into order table
  response.redirect('checkout');
});

app.get('/checkout', (request, response) => {
  response.render('checkout');
});

app.post('/checkout', (request, response) => {
  response.redirct('status');
});

app.get('/status', (request, response) => {
  response.render('status');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});