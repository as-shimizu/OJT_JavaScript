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

//おみくじボタンを押す→おみくじの結果をコンソールに表示する

////result = ['大吉','吉','中吉','小吉','凶'];
//rnum = Math.floor(Math.random() * result.length);
//console.log(rnum);
//rs2 = result[Math.floor(Math.random() * result.length)];
//console.log(rs2);
console.log('おみくじの結果：' + omikuji.getResult() );
