$(() => {

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
  function renderItems(items) {
    item.forEach(items => {
      $("#cart").prepend(createItem(item));
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