// 役のクラスを定義
var yaku = function(name, rate) {
    // メンバ変数 (インスタンス変数)
    this.name = name; //役の名前
    this.rate  = rate; //レイト
}

//定数の定義
var numDice = 3; //サイコロの数
var numPlayer = 4; //プレーヤー数
var you = 2; //ユーザのプレーヤー番号
var maxRate = 5; //最大のレイト
var maxMenashi = 3 //目なしが出た時にサイコロを振りなおせる上限回数
//変数の定義
var money = new Array(numPlayer); //所持金
var parent = 0; //親のプレーヤー番号を格納
var child = 0; //子のプレーヤー番号を格納
var latch; //掛け金を格納
var dice = []; //振ったサイコロの目を格納
var changeMoney;
var showParent = document.getElementById('showParent');
var showChild = document.getElementById('showChild');
var comment1 = document.getElementById('comment1');
var next = document.getElementById('next');
var yakuParent = new yaku("",0);　//親の役の名前とrate
var yakuChild = new yaku("",0);　//子の役の名前とrate
var resultYaku = new yaku("",0);　//役の名前とrateを一時的に保存
var end = 0; //ゲーム中は0, ゲーム終了したら1
var diceImg = [
  document.getElementById('diceImg1'),
  document.getElementById('diceImg2'),
  document.getElementById('diceImg3')
];
var moneyView = [
  document.getElementById('money1'),
  document.getElementById('money2'),
  document.getElementById('money3'),
  document.getElementById('money4')
];

//ゲームを始める
$('#moneyDecide').click(function() {
    //所持金の設定
    for (var i=0; i<numPlayer; i++) {
        money[i] = Number(document.getElementById('cash').value);
    }
	showMoney();
    //startを隠す
    $('#start').fadeOut(1);
    //fieldを表示
    $('#field').fadeIn(500);
});


$('.game').click(function() {
	$('#next').fadeOut(1);
	//親と子の設定
	if(child==numPlayer-1) {
		parent++;
		child=0;
	} else {
		child++;
	}
	if(parent==child) {
		child++;
	}
	//サイコロ画像の削除
    $('#diceImg1').fadeOut(1);
    $('#diceImg2').fadeOut(1);
    $('#diceImg3').fadeOut(1);
    comment1.innerText = ""
    
	//親と子の表示
	setTimeout('comment1.innerText = "親は" + getPlayerName(parent) + "です。"',1000);
	showParent.innerText = "親: " + getPlayerName(parent);
	setTimeout('comment1.innerText = getPlayerName(child) + "の番です。"',3000);
	showChild.innerText = "子: " + getPlayerName(child) ;
	console.log("親：　" + getPlayerName(parent) + "子：　" + getPlayerName(child));
	//親と子の勝負
	setTimeout('oneChild()',5000);
	if(child==numPlayer-2 && parent==numPlayer-1) {
		setTimeout('endGame()', 20000);
		return;
	} else {
		setTimeout("$('#next').fadeIn(1)",20000);
	}
});


//勝負する
function oneChild() {
    getLatch(); //掛け金を設定    
    
    //親がサイコロを振る
    setTimeout('getParentYaku()', 2000);

    //子がサイコロを振る
    setTimeout('getChildYaku()', 7000);
    
    //結果
	setTimeout('resultTarn()', 12000);
}

//子が役の取得
function getChildYaku() {
	comment1.innerText = "子がサイコロを振ります";
    //サイコロを投げる
    dice = [];
    var numMenashi = 0;
    var decideYaku = false;
    while(!(decideYaku)) {
      setTimeout('throwDice()',1000);
      setTimeout('getNameRate(dice)',2000); //役とレートの取得
/*      if(resultYaku.rate==-1 && numMenashi<maxMenashi) {
        numMenashi++;
        comment1.innerHTML = "目なしでした。もう一度振ってください。";
        dice = [];
      } else {*/
        decideYaku = true;
//      }
    }
	setTimeout('yakuChild = resultYaku', 3000);
    setTimeout('comment1.innerHTML = resultYaku.name',3000);
    setTimeout('console.log(yakuChild)',3000);
}

//親が役の取得
function getParentYaku() {
	comment1.innerText = "親がサイコロを振ります";
    //サイコロを投げる
    dice = [];
    var numMenashi = 0;
    var decideYaku = false;
    while(!(decideYaku)) {
      	setTimeout('throwDice()',1000);
      	setTimeout('getNameRate()',2000); //役とレートの取得
/*      	if(resultYaku.rate==-1 && numMenashi<maxMenashi) {
        	numMenashi++;
        	comment1.innerHTML = "目なしでした。もう一度振ってください。";
      	} else {*/
        	decideYaku = true;
//      	}
    }
    setTimeout('comment1.innerHTML = resultYaku.name',3000);
    setTimeout('yakuParent = $.extend(true, {}, resultYaku)',3000);
    setTimeout('console.log(yakuParent)',3000);
}


//サイコロを振る
function throwDice() {
    for(var i=0; i<numDice; i++) {
        dice.push(Math.floor(Math.random()*6) + 1);
    }
    //サイコロイメージを表示
    for(var i=0; i<numDice; i++) {
      var image = diceImg[i]
      image.src="./image/" + dice[i] + ".png";
    }
    $('#diceImg1').fadeIn(1000);
    $('#diceImg2').fadeIn(1000);
    $('#diceImg3').fadeIn(1000);
}

function getLatch() {
    latch = Math.floor(Math.random()*(money[child]/maxRate)) + 1
	comment1.innerText = "掛け金は" + latch + " ペリカ です";
}

function showChangeMoney(from, to) {
	comment1.innerText = from + "は" + to + "に" + changeMoney + "ペリカを支払います";
}

function resultTarn() {

	if(yakuParent.rate > yakuChild.rate) {
		comment1.innerText = "親の勝ちです";
		if(yakuChild.rate<-1) {
			changeMoney = yakuChild.rate * latch * (-1);
		} else {
			changeMoney = yakuParent.rate * latch;
		}
		setTimeout('showChangeMoney("子", "親")',2000);
		money[child] = Number(money[child]) - changeMoney;
		money[parent] = Number(money[parent]) + changeMoney;
	} else if(yakuParent.rate == yakuChild.rate) {
		comment1.innerText = "引き分けです";
		setTimeout('comment1.innerText = "支払いはありません"', 2000);
	} else {
		comment1.innerText = "子の勝ちです";
		if(yakuParent.rate<-1) {
			changeMoney = yakuParent.rate * latch * (-1);
		} else {
			changeMoney = yakuChild.rate * latch;
		}
		setTimeout('showChangeMoney("親","子")', 2000);
		money[parent] = Number(money[parent]) - changeMoney;
		money[child] = Number(money[child]) + changeMoney;
		if(money[parent] < 0) {
			setTimeout('comment1.innerText = "親の所持金がなくなりました"', 5000);
			showMoney();
			endGame();
		}
	}
	showMoney();
}

function endGame() {
	end = 1;
	//サイコロ画像の削除
    $('#diceImg1').fadeOut(1);
    $('#diceImg2').fadeOut(1);
    $('#diceImg3').fadeOut(1);
	setTimeout('comment1.innerText = "ゲーム終了"',1000);
	var winner = getWinPlayer();
	setTimeout('showWinner()',2000);
}

function showWinner() {
	comment1.innerText = "勝者は" + getPlayerName(winner) + "でした";
}

function getWinPlayer() {
	var winner;
	var sortMoney = new Array(numPlayer)
	sortMoney = bubleSort(money);
	for(var i=0; i < numPlayer; i++) {
		if(money[i]==sortMoney[numPlayer-1]) {
			winner = i;
		}
	}
	return winner;
}

function getNameRate() {
    //サイコロの目を昇順に並べ替える
    dice = bubleSort(dice);
    //出た目によってnameとrateを決める
    if(dice[0]==dice[1] && dice[0]==dice[2]) {
        if(dice[0]==1) {
            resultYaku.name = "ピンゾロ";
            resultYaku.rate = 5;
        } else {
            resultYaku.name = "ゾロ目";
            resultYaku.rate = 3;
        }
    } else if(dice[0]==4 && dice[1]==5 && dice[2]==6) {
        resultYaku.name = "シゴロ";
        resultYaku.rate = 2;
        //return result;
    } else if(dice[0]==dice[1]) {
        resultYaku.name = dice[2] + "の目";
        resultYaku.rate = 1;
        //return result;
    } else if(dice[1]==dice[2]) {
        resultYaku.name = dice[0] + "の目";
        resultYaku.rate = 1;
        //return result;
    } else if(dice[0]==1 && dice[1]==2 && dice[2]==3) {
        resultYaku.name = "ヒフミ";
        resultYaku.rate = -2;
        //return result;
    } else {
      resultYaku.name = "クズ";
      resultYaku.rate = -1;
    }
}

//バブルソート
function bubleSort (data) {
  var datab = data.concat();
  if(datab.length > 1) {
    for(var i=0; i < datab.length-1; i++) {
      if(i+1 >= datab.length) {
        break;
      }
      for (var j=i+1; j < datab.length; j++) {
        if(datab[i] > datab[j]) {
          datab = change(datab,i,j);
        }
      }
    }
  }
  return datab;
}

//順番を入れ替える
function change(data,i,j) {
  var prov = data[i];
  data[i] = data[j];
  data[j] = prov;
  return data;
}

//プレーヤー番号から名前を取得
function getPlayerName(num) {
	var playerName;
	switch (num) {
		case 0:
			playerName = "Player1"
      return playerName;
		case 1:
			playerName = "Player2"
      return playerName;
		case 2:
			playerName = "あなた"
      return playerName;
		case 3:
			playerName = "Player3"
      return playerName;
	}
}

function showMoney() {
	for(var i=0; i<numPlayer; i++) {
		moneyView[i].innerText = "所持金: " + money[i];
	}
}

function wait(waitSecond) {
	var startTime = new Date(); //開始時間の取得
	var nowWait = 0;
	while(nowWait<=waitSecond) {
		var nowTime = new Date();
		nowWait = nowTime.getTime() - startTime.getTime();
	}
}
