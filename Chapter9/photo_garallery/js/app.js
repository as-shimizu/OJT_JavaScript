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

//1つめの写真(main)を表示
var mainIMG = document.createElement('img');
mainIMG.setAttribute('src', album[0].src);
mainIMG.setAttribute('alt', album[0].msg);

var mainMSG = document.createElement('h1');
mainMSG.innerText = mainIMG.alt;

var main = document.getElementById('main');
main.insertBefore(mainMSG,null);
main.insertBefore(mainIMG,null);

//その他の写真(sub)を表示
var sub = document.getElementById('sub');

for(var i = 0; i < album.length; i++) {
  subIMG = document.createElement('img');
  subIMG.setAttribute('src', album[i].src);
  subIMG.setAttribute('alt', album[i].msg);
  subIMG.setAttribute('class', 'off');
  sub.insertBefore(subIMG,null);
}


//クリックした写真をmainに表示する
//写真をクリック→mainIMGとmainMSGを書き換える
sub.addEventListener('click', function(event) {
  if (event.target.src) {
    mainIMG.src = event.target.src;
    mainMSG.innerText = event.target.alt;
  }
})

sub.addEventListener('mouseover', function(event) {
  if (event.target.src) {
    theTarget = event.target
    theTarget.className = 'on';
  }
})

sub.addEventListener('mouseout', function(event) {
  if (event.target.src) {
    theTarget = event.target
    theTarget.className = 'off';
  }
})
