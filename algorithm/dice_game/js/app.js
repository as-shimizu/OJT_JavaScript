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
var showParent = document.getElementById('showParent');
var showChild = document.getElementById('showChild');
var comment1 = document.getElementById('comment1');
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
$('#startGame').click(function() {
    //所持金の設定
    for (var i=0; i<numPlayer; i++) {
        money[i] = Number(document.getElementById('cash').value);
    }
	showMoney();
    //startを隠す
    $('#start').fadeOut(1);
    //fieldとworkspaceを表示
    $('#field').fadeIn(1000);
    $('#workspace').fadeIn(1000);
    setTimeout("game()",2000);
});


function game() {
    for(parent=0; parent<numPlayer; parent++) {
	    comment1.innerText = "親は" + getPlayerName(parent) + "です。";
		showParent.innerText = "親: " + getPlayerName(parent);
		for(child=0; child<numPlayer; child++) {
			if(end==1) {
				return;
			}
			
			if(child!=parent) {
				comment1.innerText = getPlayerName(child) + "の番です。";
				showChild.innerText = "子: " + getPlayerName(child) ;
//				setTimeout('alert("親は" + getPlayerName(parent) + "、　子は" + getPlayerName(child) + "です。")',3000);
				console.log("親：　" + getPlayerName(parent) + "子：　" + getPlayerName(child));
				oneChild();
			}
		}
	}
	endGame();
}


//勝負する
function oneChild() {
    var latch = getLatch(); //掛け金を設定
    //親がサイコロを振る
	if(parent==you) {
//		alert("サイコロを振ってください")
	}
    getYaku();
    yakuParent = resultYaku;
	//子がサイコロを振る
    if(parent==you) {
//		alert("サイコロを振ってください")
	}
    getYaku();
    yakuChild = resultYaku;
    console.log(yakuParent, yakuChild);
    //結果
	resultTarn(latch);
	showMoney();
}

//役の取得
function getYaku() {
    //サイコロを投げる
    var numMenashi = 0;
    var decideYaku = false;
    while(!(decideYaku)) {
      var dice = throwDice();
      getNameRate(dice); //役とレートの取得
      if(resultYaku.rate==-1 && numMenashi<maxMenashi) {
        numMenashi++;
      } else {
        decideYaku = true;
      }
    }

    var yakuName = document.getElementById('comment1');
    yakuName.innerHTML = resultYaku.name;
    console.log(resultYaku.name);
}



//サイコロを振る
function throwDice() {
    //サイコロ画像の削除
/*    $('#diceImg1').fadeOut(1);
    $('#diceImg2').fadeOut(1);
    $('#diceImg3').fadeOut(1);
    $('#yakuName').fadeOut(1);
*/	
    var dice = [];
    for(var i=0; i<numDice; i++) {
        dice.push(Math.floor(Math.random()*6) + 1);
    }
    //サイコロイメージを表示
    for(var i=0; i<numDice; i++) {
      var image = diceImg[i]
      image.src="./image/" + dice[i] + ".png";
    }
/*    $('#diceImg1').fadeIn(1000);
    $('#diceImg2').fadeIn(1500);
    $('#diceImg3').fadeIn(2000);
    $('#yakuName').fadeIn(2500);*/
    return dice;
}

function getLatch() {
//  if(child==you) {
	  //
//  } else {
    //掛け金を自動的に決める
    latch = Math.floor(Math.random()*(money[child]/maxRate)) + 1
//  }
  comment1.innerText = "掛け金は" + latch + " ペリカ です";
}

function resultTarn() {
	var changeMoney
	if(yakuParent.rate > yakuChild.rate) {
		comment1.innerText = "親の勝ちです";
		changeMoney = yakuParent.rate * latch;
		comment1.innerText = "子は親に" + changeMoney + "ペリカを支払います。";
		money[child] = Number(money[child]) - changeMoney;
		money[parent] = Number(money[parent]) + changeMoney;
	} else if(yakuParent.rate == yakuChild.rate) {
		comment1.innerText = "引き分けです";
		comment1.innerText = "支払いはありません";
	} else {
		comment1.innerText = "子の勝ちです";
		changeMoney = yakuChild.rate * latch;
		comment1.innerText = "親は子に" + changeMoney + "ペリカを支払います。";
		money[parent] = Number(money[parent]) - changeMoney;
		money[child] = Number(money[child]) + changeMoney;
		if(money[parent] < 0) {
			comment1.innerText = "親の所持金がなくなりました";
			showMoney();
			endGame();
		}
	}
	showMoney();
}

function endGame() {
	end = 1;
	comment1.innerText = "ゲーム終了";
	var winner = getWinPlayer();
	comment1.innerText = "勝者は" + getPlayerName(winner) + "でした";
}

function getWinPlayer() {
	var winner;
	var sortMoney = new Array(numPlayer)
	sortMoney = bubleSort(money);
	console.log(sortMoney);
	for(var i=0; i < numPlayer; i++) {
		console.log(money[i] + "  " + sortMoney[numPlayer-1]);
		if(money[i]==sortMoney[numPlayer-1]) {
			winner = i;
		}
	}
	return winner;
}

function getNameRate(dice) {
    //サイコロの目を昇順に並べ替える
    dice = bubleSort(dice);

    //出た目によってnameとrateを決める

    if(dice[0]==dice[1] && dice[0]==dice[2]) {
        if(dice[0]==1) {
            resultYaku = new yaku("ピンゾロ",5);
            //return result;
        } else {
            resultYaku = new yaku("ゾロ目",3);
            //return result;
        }
    } else if(dice[0]==4 && dice[1]==5 && dice[2]==6) {
        resultYaku = new yaku("シゴロ",2);
        //return result;
    } else if(dice[0]==dice[1]) {
        resultYaku = new yaku(dice[2] + "の目",1);
        //return result;
    } else if(dice[1]==dice[2]) {
        resultYaku = new yaku(dice[0] + "の目",1);
        //return result;
    } else if(dice[0]==1 && dice[1]==2 && dice[2]==3) {
        resultYaku = new yaku("ヒフミ",-2);
        //return result;
    } else {
      resultYaku = new yaku("クズ",-1);
    }
}

//バブルソート
function bubleSort (data) {
  var datab = data;
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