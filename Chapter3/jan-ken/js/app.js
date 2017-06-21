//ジャンケンの手に番号を設定
var GU = 1;
var CHOKI = 2;
var PA = 3;

//ジャンケンの手を入力するダイアログ
var hand = prompt('半角数字で1～3の数字を入力してください。\n\n' + GU + ':グー\n' + CHOKI + ':チョキ\n' + PA + ':パー');

 hand = parseInt(hand);

 //入力値のチェック
 //GU, CHOKI, PAのどれにも一致しなかった場合のアラート
 if (hand !== GU && hand !== CHOKI && hand !==PA ) {
   alert('入力値をうまく認識できませんでした。ブラウザを再読み込みすると、もう一度挑戦できます。');

 } else {
   //コンピュータの手を決める
   var com = Math.floor(Math.random() *3) + 1;

   //コンピュータの手の名前
   var comHandName = '';
   switch (com) {
     case GU:
      comHandName = 'グー';
      break;

      case CHOKI:
       comHandName = 'チョキ';
       break;

       case PA:
        comHandName = 'パー';
        break;

        default:
        alert('入力値をうまく認識できませんでした。ブラウザを再読み込みすると、もう一度挑戦できます。');
    }
   //結果判定
   var msgResult = '';

   //あいこ
   if (hand === com) {
     msgResult = 'あいこでした。';

  //勝ち
  } else if ( (hand == PA && com == GU) || (hand == CHOKI && com == PA) || (hand == GU && com == CHOKI) ) {
    msgResult = '勝ちました。';

　//負け
  }　else {
    msgResult = '負けました。';
  }

//結果の出力
  alert(msgResult + '\n コンピュータの出した手は「' + comHandName + '」でした');
}
