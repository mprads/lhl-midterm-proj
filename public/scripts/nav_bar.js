// Initialize affix and add an offset to add affix class on scroll
$('#mainNav').affix({
  offset: {
    top: 100
  }
})

$('[src="images/logo-image-3.png"]').click(function() {
    window.location.href = "/";
    return false;
});
