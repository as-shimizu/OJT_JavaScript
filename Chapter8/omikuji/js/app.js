//配列を作成：　変数名 = ['要素1', '要素2'…]
//変数名[インデックス番号] (0からはじまる)

//オブジェクトでまとめる
/*var human = {
  name: '山田',
  age: 31
}*/


//おみくじオブジェクトにくじ引きメソッドを入れる
var omikuji = {
    //くじを引くメソッド
    getResult: function() {
      result = ['大吉','吉','中吉','小吉','凶']
      return result[Math.floor(Math.random() * result.length)];
    }
}

//おみくじボタンを押す→おみくじの結果を画面に表示する
var getOmikuji = document.getElementById('getOmikuji');

//出力先の設定
var viewResult = document.createElement('div');
var parent = getOmikuji.parentElement;
parent.insertBefore(viewResult, null);

//ボタンを押したときの処理
getOmikuji.addEventListener('click', function() {
  viewResult.innerHTML = '<p> おみくじの結果：' + omikuji.getResult();
})



//
