//変数を割り当てる
//id=button:button, id=form: form, id=textarea: textarea
var button = document.getElementById('button');
var form = document.getElementById('form1');
var textarea = document.getElementById('textarea');

//文字数制限を表示する
//文字数を調べる→表示するdivタグを作る→入力されたとき、入力文字数を取得し、表示する
var maxLeng = textarea.getAttribute('maxlength');

var message = document.createElement('div');
message.setAttribute('id','message');
var parent = textarea.parentElement;
parent.insertBefore(message, textarea);

//文字が入力されたとき
textarea.addEventListener('keyup', function() {
  var letterLeng = textarea.value.length;
  message.innerHTML = '<p>あと「' + (maxLeng - letterLeng) + '」文字入力できます</p>';
});

//残り時間の表示
var rimitTime = 3; //3秒に設定
var timeMsg = document.createElement('div');
parent.insertBefore(timeMsg, null);


//お問い合わせボタンを押すとフォームが出現する
button.addEventListener('click', function() {
  form.style.display = 'block';

　//お問い合わせボタンを押した後制限時間が設定する
  var timerID = setInterval(function() {
    timeMsg.innerHTML = '<p> 制限時間：' + rimitTime + '秒</p>';
　　if(rimitTime == 0) {
      alert('制限時間終了');
      clearInterval(timerID);
    }
    rimitTime--
  },1000);
});
