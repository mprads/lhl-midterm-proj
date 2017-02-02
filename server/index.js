const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession( {
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.get('/register', (request, response) => {
  response.redirect('/register');
});

app.get('/checkout', (request, response) => {
  response.render('/checkout');
});

app.get('/status', (request, response) => {
  response.redirect('/status');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});