$(function() {
  //検索ボタンを押したら
  $('#search').on('click',function() {
    //ＷＥＢアプリに郵便番号をリクエスト
    $.ajax({
      url: "http://zipcloud.ibsnet.co.jp/api/search?zipcode=" + $('zip').val(),
      dataType : 'jsonp',
    //処理が終わったら
    }).done(function(data) {
      //console.log(data);
      if (data.results) {
        //データ取得できたとき
        


      }else {
        alert('該当するデータが見つかりませんでした');
      }
    //処理ができなかったとき
    }).fail(function() {
      alert('通信に失敗しました')
    });
  });
});
