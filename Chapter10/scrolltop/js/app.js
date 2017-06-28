$(function () {
  var topBtn = $('#scrollTop');
  //ボタンを隠す
  topBtn.hide();


  //スクロールされたらボタンを表示する
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    }else {
      topBtn.fadeOut();
    }
  });
});
