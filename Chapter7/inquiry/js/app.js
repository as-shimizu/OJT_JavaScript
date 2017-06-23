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


//お問い合わせボタンを押すとフォームが出現する
button.addEventListener('click', function() {
  form.style.display = 'block';
});
