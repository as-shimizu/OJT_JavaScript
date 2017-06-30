
$(function () {
  //""手を選択してください"をクリックしたら選択肢が現れる
  $('#hand dt').click(function() {
    $('#hand dd').slideToggle();
  });

  //ジャンケンの手に番号を設定
  var GU = 1;
  var CHOKI = 2;
  var PA = 3;

  //手を取得
  $('#gu').click(function() {
    var hand = GU;
    janken(hand);
  });

  $('#choki').click(function() {
    var hand = CHOKI;
    janken(hand);
  });

  $('#pa').click(function() {
    var hand = PA;
    janken(hand);
  });


});


function janken (hand) {
  //コンピュータの手を決める
  var com = Math.floor(Math.random() *3) + 1;
  //コンピュータの手の名前
  var hd = handName(com);

  //結果判定
  var winlow = result(hand,com);
  var msgResult = message(hand, com);
  msgResult = msgResult + 'コンピュータの出した手は「' + hd + '」でした'

  //結果の出力
  var viewResult = document.createElement('p');
  viewResult.innerText = msgResult;
  var parent = document.getElementById("result");
  parent.insertBefore(viewResult,null);
}

//結果判定の関数
function result(hand, com) {
  var winlow = 0;

  //あいこの場合
  if (hand === com) {
    winlow = 1;
    return winlow;

  //handが勝った場合
  } else if (com - hand ===1 || com - hand === -2) {
    winlow = 2;
    return winlow;

  //handが負けた場合
  } else {
    winlow = 3;
    return winlow;
  }
}

//結果のメッセージを作成する関数
function message(hand, com) {
  var msgResult = "";
  var winlow = result(hand,com);

  //あいこの場合
  if ( winlow === 1) {
    msgResult = "あいこでした。";
    return  msgResult;

  //勝った場合
  } else if (winlow === 2) {
    msgResult = "勝ちました。";
    return  msgResult;

  //負けた場合
  } else if (winlow === 3) {
      msgResult = "負けました。";
      return  msgResult;
  }
}

//手の名前を取得する関数
function handName(hd) {
  var haName = "";
  switch (hd) {
    case 1:
      hd = "グー";
      return hd;

    case 2:
      hd = "チョキ";
      return hd;

    case 3:
      hd = "パー";
      return hd;
  }
}
