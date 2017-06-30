//APIキーを設定
var key = 'AIzaSyCkF7VX47QrZW22-XiSfNP42T0cAzLXiS0;'
var url = 'http://www.googleapis.com/youtube/v3/search?;'

//パラメータのセット
url += 'type=video';
url += '&part=snippet';
url += '&q=music';
url += '&videoEmbeddable=true';
url += '&videoSyndicated=true';
url += '&maxResults=6';
url += '&key=' + key;

$(function () {
  //youtubeの動画検索
  $.ajax({
    url: url,
    dataType : 'jsonp'

  //通信できたとき
  }).done(function(data) {
    if (data.items) {
      //データ取得できたとき
    } else {
　　　//テータがなかったとき
      console.log(data);
      alert('該当するデータが見つかりませんでした');
    }
 //通信できなかったとき
  }).fail(function(data) {
    alert('通信に失敗しました');
  });
});
