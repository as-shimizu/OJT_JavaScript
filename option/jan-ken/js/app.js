//動作
var winlow = 0;　//勝ち負け（あいこ：１　勝ち：２　負け：３）
var winning = 0;　//連勝回数

//ジャンケンの手に番号を設定
var GU = 1;
var CHOKI = 2;
var PA = 3;

while ( winlow !== 3) {
  //  ジャンケンする
  winlow = janken();

  //勝った場合は連勝を加算
  if(winlow ===2) {
    winning++;
  }
}

//連勝記録
alert("ただいまの連勝記録は" + winning + "回でした");

// 関数の定義
//手を入力する関数
function input() {
  var hand = prompt('半角数字で1～3の数字を入力してください。\n\n' + GU + ':グー\n' + CHOKI + ':チョキ\n' + PA + ':パー');
  hand = parseInt(hand);

  //入力値チェック
  if(hand !== GU && hand !== CHOKI && hand !== PA ) {
    alert('入力値をうまく認識できませんでした。ブラウザを再読み込みすると、もう一度挑戦できます。');
    return undefined;
  }
  return hand;
}


//手の名前を取得する関数
function handName(hd) {
  var haName = "";
  switch (hd) {
    case GU:
      hd = "グー";
      break;
    case CHOKI:
      hd = "チョキ";
      break;    
    case PA:
      hd = "パー";
      break;
  }
  return hd;
}

//結果判定の関数
function result(hand, com) {
  var winlow = 0;

  //あいこの場合
  if (hand === com) {
    winlow = 1;
  //handが勝った場合
  } else if (com - hand ===1 || com - hand === -2) {
    winlow = 2;
  //handが負けた場合
  } else {
    winlow = 3;
  }
  return winlow;
}

//結果のメッセージを作成する関数
function message(hand, com) {
  var msgResult = "";
  var winlow = result(hand,com);

  //あいこの場合
  if ( winlow === 1) {
    msgResult = "あいこでした";
  //勝った場合
  } else if (winlow === 2) {
    msgResult = "勝ちました";
  //負けた場合
  } else if (winlow === 3) {
    msgResult = "負けました";
  }
  return  msgResult;
}

//ジャンケンを1回行う関数
function janken () {
  //ジャンケンの手を入力する
  var hand = input();

  //コンピュータの手を決める
  var com = Math.floor(Math.random() *3) + 1;

  //コンピュータの手の名前
  var hd = handName(com);

  //結果判定
  var winlow = result(hand,com);
  var msgResult = message(hand, com);

  //結果の出力
  alert(msgResult + '\n コンピュータの出した手は「' + hd + '」でした');
  return winlow;
}
