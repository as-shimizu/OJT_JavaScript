//アルバム(配列)作成
var album = [
  {src: 'image/storm.jpg', msg: 'かみなり'},
  {src: 'image/kasa.jpg', msg: '傘雲'},
  {src: 'image/sun.jpg', msg: '夏の太陽'},
  {src: 'image/high_top.jpg', msg: '夕立雲'},
  {src: 'image/taifu.jpg', msg: '台風'},
  {src: 'image/un-kai.jpg', msg: '雲海'},
  {src: 'image/sunset.jpg', msg: '夕暮れ'},
  {src: 'image/snow.jpg', msg: '雪景色'}
];

//1つめのデータを表示
var mainIMG = document.createElement('img');
mainIMG.setAttribute('src', album[0].src);
mainIMG.setAttribute('alt', album[0].msg);

var mainMSG = document.createElement('p');
mainMSG.innerText = mainIMG.alt;

var parent = document.getElementById('main');
parent.insertBefore(mainIMG,null);
parent.insertBefore(mainMSG,null);
