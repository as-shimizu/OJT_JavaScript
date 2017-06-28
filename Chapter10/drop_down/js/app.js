
$(function () {
  //#menu dtをクリックしたら#menu ddが現れる
  $('#menu dt').click(function() {
    $('#menu dd').slideToggle();
  });
});
