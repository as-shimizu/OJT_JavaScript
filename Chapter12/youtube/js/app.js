//APIキーを設定
var key = 'AIzaSyCkF7VX47QrZW22-XiSfNP42T0cAzLXiS0';
var url = 'https://www.googleapis.com/youtube/v3/search?';

//パラメータのセット
url += 'type=video';
url += '&part=snippet';
url += '&q=music';
url += '&videoEmbeddable=true';
url += '&videoSyndicated=true';
url += '&maxResults=6';
url += '&key=' + key;

console.log(url);
$(function () {
  //youtubeの動画検索
  $.ajax({
    url: url,
    dataType : 'jsonp'

  //通信できたとき
  }).done(function(data) {
    if (data.items) {
      //データ取得できたとき
      setData(data);
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

//動画を表示する関数
function setData(data) {
//パラメータ初期化
  var result = '';
  var video = '';
  console.log(data.items.length)

  //HTMLに追記
  for (var i = 0; i < data.items.length; i++) {
    video = '<iframe src="https://www.youtube.com/embed/';
    video += data.items[i].id.videoId;
    video += '" allowfullscreeb></iframe>';
    result += '<div class="video">' + video + '</div>';

  }

  $('#videolist').html(result);
}
