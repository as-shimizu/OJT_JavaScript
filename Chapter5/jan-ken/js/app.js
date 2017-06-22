//手を入力する関数
function input() {
  var hand = prompt('半角数字で1～3の数字を入力してください。\n\n' + GU + ':グー\n' + CHOKI + ':チョキ\n' + PA + ':パー');
  hand = parseInt(hand);

  //入力値チェック
  if(hand !== GU && hand !== CHOKI && hand !== PA ) {
    alert('入力値をうまく認識できませんでした。ブラウザを再読み込みすると、もう一度挑戦できます。');
    return undefined;
  } else {
    return hand;
  }
}


//手の名前を取得する関数
function handName(hd) {
  var haName = "";
  switch (hd) {
    case GU:
      hd = "グー";
      return hd;

    case CHOKI:
      hd = "チョキ";
      return hd;

    case PA:
      hd = "パー";
      return hd;
  }
}

//メッセージを決める
function result(hand, com) {
  var msgResult = "";

  //あいこの場合
  if (hand === com) {
    msgResult = "あいこでした";
    return msgResult;

  //handが勝った場合
  } else if (com - hand ===1 || com - hand === -2) {
    msgResult = "勝ちました";
    return msgResult;

  //handが負けた場合
  } else {
    msgResult = "負けました"
    return msgResult;
  }
}

//ジャンケンの手に番号を設定
var GU = 1;
var CHOKI = 2;
var PA = 3;

//ジャンケンの手を入力する
var hand = input();

//コンピュータの手を決める
var com = Math.floor(Math.random() *3) + 1;

//コンピュータの手の名前
  var hd = handName(com);



//結果判定
  msgResult = result(hand, com);
//結果の出力
  alert(msgResult + '\n コンピュータの出した手は「' + hd + '」でした');
