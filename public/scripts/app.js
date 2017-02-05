$(() => {

  $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
    });

    // function makeCall(orderObj) {
    //   const accountSid = 'ACe70042067db440f9bbe6ae7e23ae8cc9';
    //   const authToken = '4120723cbaf4c52b3cdea769f87bf39f';
    //   const client = require('twilio')(accountSid, authToken);
    //   const order =  orderObj.name;
    //   const name = "myles"

    //   client.calls.create({
    //     url: "https://handler.twilio.com/twiml/EH3e38ad92be2e80bd73ba50b586b1fe21" + name + "has ordered" + order,
    //     to: "+16043652188",
    //     from: " +16043300743"
    //   }, function(err, call) {
    //     process.stdout.write(call.sid);
    //   });
    // }
  function createItem(itemObj) {
    const $name = $('<span>').text(itemObj.name).addClass('.item-name');
    const $price = $('<span>').text(itemObj.price).addClass('.item-price');
    const $quantity = $('<span>').text(itemObj.quantity).addClass('.item-quantity');
    let $body = $('<li>');
    $body.append($name, $price);
    return $body;
  }

  function renderItems(items) {
    items.forEach(item => {
      $('.shopping-cart-items').append(createItem(item));
    })
  }

  function loadCart () {
    $.ajax({
      method: "GET",
      url: "/cart"
      }).then((response) => {
        $(".shopping-cart-items").empty();
        renderItems(response)
    })
  }

  $(".deleter").on("click", function () {
    const data = $(this).closest($("form")).find("input").val();
    $.ajax({
       method: "POST",
      url: "/cart/delete/" + data,
      data: data
    }).then((data) => {
      loadCart();
    })
  });

  $(".pick-item").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/cart",
      data: data
    }).then((data) => {
      loadCart();
    })
  });

  $('.features').on('click', function(event) {
    if($(this).find('.options').is(':animated')) {
      return false;
    }
    $(this).closest($('.container-fluid')).find('.options').slideToggle('slow')
  });



   $(".cart-badge").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
    });

  loadCart();
});

