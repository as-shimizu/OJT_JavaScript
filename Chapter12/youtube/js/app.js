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

console.log(url);
