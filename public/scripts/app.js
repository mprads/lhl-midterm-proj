$(() => {

  // $("confirm-order").on("submit", (event) => {

  //   function makeCall() { var accountSid = 'ACe70042067db440f9bbe6ae7e23ae8cc9';
  //     var authToken = '4120723cbaf4c52b3cdea769f87bf39f';
  //     var client = require('twilio')(accountSid, authToken);

  //     client.calls.create({
  //       url: "https://handler.twilio.com/twiml/EH3e38ad92be2e80bd73ba50b586b1fe21" + name + "has ordered" + order,
  //       to: "+16043652188",
  //       from: " +16043300743"
  //     }, function(err, call) {
  //       process.stdout.write(call.sid);
  //     });
  //   }
  //   makeCall(order.cus_name, order);
  // });


    $(".cart-badge").on("click", function() {
      $(".shopping-cart").fadeToggle( "fast");
    });




  $(".pick-item").on("submit", (event) => {
    event.preventDefault();
    $.ajax({
      method: "POST",
       url: "/cart",
      data: data
    })
    loadItems();
    // if item does exist
    $.ajax({
      method: "PUT",
      // url: "/carts",
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

  function createItem(itemObj) {
    const name = $(<"span">).text(itemObj.)

  }

  // Ajax post to add items to cart
  function renderItems(items) {
    items.forEach(item => {
      $("#cart").append(createItem(item));
    });
  }

  function loadCart () {
    $.ajax({
      method: "GET",
      url: "/carts"
    }).then((respose) => {
      $("#cart").empty();
      renderCart(respose)
    });
  }
  loadCart();
});