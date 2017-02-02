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

$("create-order").on("submit", (event) => {
    event.preventDefault();
// creates order id row and adds order-id to cookie
  });

  $("menu").on("submit", (event) => {
    event.preventDefault();
    // if item doesnt exist
    $.ajax({
      method: "POST",
      url: "/carts",
      data: data
    })
    loadItems();
    // if item does exist
    $.ajax({
      method: "PUT",
      url: "/carts",
      data: data
    })
    loadItems();
  });

  $("delete-from-cart").on("submit", (event) => {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/carts",
      data: data
    })
    loadItems();
  });

// Ajax post to add items to cart
function renderCart(items) {
    item.forEach(items => {
      $("#cart").prepend(createItem(item));
    });
  }

function loadItems () {
    $.ajax({
      method: "GET",
      url: "/carts"
    }).then((respose) => {
      $("#cart").empty();
      renderCart(respose)
    });
  }


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});