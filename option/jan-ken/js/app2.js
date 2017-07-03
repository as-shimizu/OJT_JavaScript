//変数設定
var GU = 1;
var CHOKI = 2;
var PA = 3;
var count = 0;　//試合回数
var win = 0; //勝った回数
var winlow = 0;　//勝ち負け（あいこ：１　勝ち：２　負け：３）
var me =document.getElementById("me");  //自分の手
var com =document.getElementById("com");  //  相手の手

//結果の出力
var viewAllRes = document.createElement('p');
viewAllRes.innerText = count + '試合中' + win + '回勝ちました';
var parent = document.getElementById("select");
parent.insertBefore(viewAllRes,null);

$(function () {
  //""手を選択してください"をクリックしたら選択肢が現れる
  $('#hand dt').click(function() {
    $('#hand dd').slideToggle();
  });

  //手を取得
  $('#gu').click(function() {
    me.src = "image/gu.png";
    $('#me').show("slow");
    setTimeout("janken(GU)",1000);
  });

  $('#choki').click(function() {
      me.src = "image/choki.png";
      $('#me').show("slow");
    setTimeout("janken(CHOKI)",1000);
  });

  $('#pa').click(function() {
      me.src = "image/pa.png";
      $('#me').show("slow");
    setTimeout("janken(PA)",1000);
  });


});

//関数の設定
//じゃんけん1回行う関数
function janken (hand) {
  count++
  //コンピュータの手を決める
  var com = Math.floor(Math.random() *3) + 1;
  //コンピュータの手の名前
  var hd = handName(com);

  //結果判定
  $('#com').show("slow");
  winlow = result(hand,com);
  var msgResult = message(hand, com);
  msgResult = count + '回戦：' + msgResult

  if(winlow===2) {
    win++
  }


  //結果の出力
  var viewResult = document.createElement('p');
  viewResult.innerText = msgResult;
  var parent = document.getElementById("result");
  parent.insertBefore(viewResult,null);
  $('#result').show("slow");
  
  viewAllRes.innerText = count + '試合中' + win + '回勝ちました';
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
    case GU:
      hd = "グー";
      com.src = "image/gu.png";
      return hd;

    case CHOKI:
      hd = "チョキ";
      com.src = "image/choki.png";
      return hd;

    case PA:
      hd = "パー";
      com.src = "image/pa.png";
      return hd;
  }
}
