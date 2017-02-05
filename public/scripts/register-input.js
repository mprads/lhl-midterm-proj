$(document).ready(function () {

  $('[action="/register/addcust"]').on("submit", function (event) {
    const $first_name = $('.first-name').val();
    const $last_name = $('last-name').val();
    const $num1 = $('.phone-1').val();
    const $num2 = $('.phone-2').val();
    const $num3 = $('.phone-3').val();

    $name = $first_name + " " + $last_name;

    const $number = $num1 + $num2 + $num3;
    const numInt = Number($number);

    if (!$name || !$number) {
      alert("Please enter all fields");
      event.preventDefault();
      return;
    }
    if($num1 !== "604" && $num1 !== "778"){
      alert("Please enter a valid area code");
      event.preventDefault();
      return;
    }
    if(!Number.isInteger(numInt)){
      alert("Please enter a valid phone number");
      event.preventDefault();
      return;
    }
  });
});
