$(document).ready(function () {

  $('[action="/register/addcust"]').on("submit", function (event) {
    var $name = $('#username-field').val();
    var $number = $('#phone-field').val();
    if (!$name || !$number) {
      alert("Please enter your name");
      event.preventDefault();
      return;
    }
  });
});
