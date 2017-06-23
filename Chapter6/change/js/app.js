
//id=practiceを書き換える
var practice = document.getElementById('practice');
practice.innerHTML = '<h1>れんしゅう</h1>';

//CSSを追加する
//背景色：#999999, 文字サイズ:30px, 文字色:#FFFFFF
practice.style.backgroundColor = '#999999';
practice.style.fontSize = '30px';
practice.style.color = "#FFFFFF";

//要素の追加
//<div id='first'><p>要素を追加</p></div>をHTMLに追加する
var first = document.createElement('div');
first.setAttribute('id','first');
first.innerHTML = '<p> 要素を追加 </p>';
practice.insertBefore(first, null);

//さらに要素を追加
//<div id='second'> <p>さらに要素を追加</p> </div>
var second = document.createElement('div');
second.setAttribute('id','second');
second.innerHTML = '<p> さらに要素を追加 </p>';
practice.insertBefore(second, first);

//要素を削除する
//親要素を探す→削除

//firstを削除する
var parent = first.parentElement;
parent.removeChild(first);
