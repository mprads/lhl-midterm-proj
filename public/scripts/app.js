$(() => {

  $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
    });

  function createItem(itemObj) {
    const $name = $('<span>').text(itemObj.name).addClass('.item-name');
    const $price = $('<span>').text(itemObj.price).addClass('.item-price');
    const $quantity = $('<span>').text(itemObj.quantity).addClass('.item-quantity');
    let $body = $('<li>');
    $body.append($name, $('<br>'), $price);
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

  $(".update-time").on("click", function (event) {
    event.preventDefault();
    const data = $("textarea").val();
    $.ajax({
      method: "POST",
      url: "/order-time/" + data,
      data: data
    }).then((data) => {
      console.log(data);
    })
  });

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
    const $this = $(this).closest($('.container-fluid'));
    if($this.find('.options').is(':animated')) {
      return false;
    }
    $this.find('.options').slideToggle('slow')
  });

  $(".cart-badge").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
  });

  loadCart();
});

