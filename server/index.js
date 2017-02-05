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

const moment = require('moment');

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

app.post('/register/addcust', (request,response) => {
  knex.insert({'cus_name': request.body.Name, 'phone': request.body.Phone, 'status_id': 1})
  .returning('id')
  .into('orders')
  .then((data) => {
    request.session.order_id = data[0];
    response.redirect('/');
  })
  .catch(ex => {
    response.status(500).json(ex);
  });
  return;
})

app.post('/cart/delete/:id', (request, response) => {
  let order_id = request.session.order_id;
  knex('line_items')
  .where('item_id', request.params.id)
  .del()
  .then((data) => {
    response.json(data);
  })
  .catch(ex => {
    response.status(500).json(ex);
  });
  return;
});

app.post('/cart', (request, response) => {
  let order_id = request.session.order_id;
  let food_id = request.body.food_id;
  knex('line_items')
  .insert({'item_id': food_id, 'quantity': 1, 'order_id': order_id })
  .returning('item_id')
  .then((data) => {
    response.json(data);
  })
  .catch(ex => {
    response.status(500).json(ex);
  });
  return;
});

app.get('/cart', (request, response) => {
  let order_id = request.session.order_id;
  knex('orders')
  .join('line_items', 'orders.id', 'line_items.order_id')
  .join('items', 'line_items.item_id', 'items.id')
  .select('items.name', 'items.price', 'line_items.quantity')
  .where('orders.id', order_id)
  .then((data) => {
    response.json(data);
  })
  .catch(ex => {
    response.status(500).json(ex);
  });
  return;
});

app.get('/', (request, response) => {
    knex('items')
    .join('food_types', 'items.food_type_id', 'food_types.id')
    .select('items.name','items.id', 'items.description', 'items.price', 'items.food_type_id', 'food_types.name as type_name')
    .then((data) => {
      const grouped = groupBy(data, 'food_type_id');
      response.render('index', { food_types: grouped});
    })
    .catch(ex => {
      response.status(500).json(ex);
    });
    return;
});

app.get('/register', (request, response) => {
  response.render('register');
});

app.get('/checkout', (request, response) => {
  let order_id = request.session.order_id;
  if (!order_id || order_id.length === 0) {
    response.redirect('/');
    return;
  }
  knex('orders')
  .join('line_items', 'orders.id', 'line_items.order_id')
  .join('items', 'line_items.item_id', 'items.id')
  .select('orders.cus_name', 'orders.phone', 'line_items.quantity', 'items.name', 'items.price')
  .where('orders.id', order_id)
  .then((data) => {
      response.render('checkout', {data: data});
    })
  .catch(ex => {
      response.status(500).json(ex);
  });
});

app.get('/status', (request, response) => {
  let order_id = request.session.order_id;
  knex('orders')
  .join('statuses', 'orders.status_id', 'statuses.id')
  .select('orders.id', 'orders.cus_name', 'orders.phone', 'orders.created_at', 'statuses.status_name')
  .where('orders.id', order_id)
  .then((data) => {
    response.render('status', {data: data, moment: moment});
  })
});

app.get('/orders', (request, response) => {
  knex.raw('SELECT orders.id, orders.cus_name, orders.phone, orders.created_at, orders.status_id, statuses.status_name, order_total.order_total FROM orders JOIN (SELECT line_items.order_id, SUM(line_items.quantity*items.price) AS order_total FROM line_items JOIN items ON line_items.item_id = items.id GROUP BY line_items.order_id) AS order_total ON orders.id = order_total.order_id JOIN statuses ON orders.status_id = statuses.id ORDER BY orders.id')
  .then((data) => {
    response.render('orders', {data: data.rows, moment: moment});
  })
  .catch(ex => {
    response.status(500).json(ex);
  });
});

app.post('/order-info', (request, response) => {
  let order_id = request.session.order_id;
  knex('orders')
  .join('line_items', 'orders.id', 'line_items.order_id')
  .join('items', 'line_items.item_id', 'items.id')
  .select('orders.cus_name', 'orders.phone', 'orders.status_id', 'line_items.quantity', 'items.name', 'items.price')
  .where('orders.id', order_id)
  .then((data) => {
    filterOrder(data);
    response.json(data);
    })
  .catch(ex => {
      response.status(500).json(ex);
  });
});

app.post('/checkout', (request, response) => {
  response.redirct('status');
  return;
});

function filterOrder(orderObj) {
  let strName = orderObj[0].cus_name;
  strName = strName.replace(" ", "");
  let strOrder = "";
  orderObj.forEach((obj) => {
    strOrder += obj.name.replace(" ", "%20");
    strOrder = strOrder.replace(" ", "%20");
  });
 makeCall(strName, strOrder);
}

function makeCall(name, order) {
  const accountSid = 'ACe70042067db440f9bbe6ae7e23ae8cc9';
  // const authToken = '4120723cbaf4c52b3cdea769f87bf39f';
  const client = require('twilio')(accountSid, authToken);
  console.log("https://handler.twilio.com/twiml/EH3e38ad92be2e80bd73ba50b586b1fe21?Name=" + name + "&Order=" + order)
  client.calls.create({
    url: "https://handler.twilio.com/twiml/EH3e38ad92be2e80bd73ba50b586b1fe21?Name=" + name + "&Order=" + order,
    to: "+16043652188",
    from: " +16043300743"
  }, function(err, call) {
    process.stdout.write(call.sid);
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
