//所持金を入力
var budget = prompt('所持金を数字で入力してください');
budget = parseFloat(budget);

//おなかのすき具合
var is Hungry = confirm('お腹は空いていますか？');

//所持金が1500円以上ならピザを購入
//＋所持金が1500未満のとき
if (budget >= 1500 && isHungry) {
  alert('ピザを注文しました');
} else if (budget >= 500) {
  alert('ポテトを購入しました');
} else {
  alert('節約、節約．．．');
}
