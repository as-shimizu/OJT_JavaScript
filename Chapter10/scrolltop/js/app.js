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

  //上に戻るボタンを無効化する→アニメーション設定
  topBtn.click(function() {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    },500);
  });
});
