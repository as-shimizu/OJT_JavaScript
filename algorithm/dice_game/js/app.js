// 役のクラスを定義
var yaku = function (name, rate) {
    this.name = name;
    this.rate = rate;
}
//定数の定義
var NUM_DICE = 3;
var NUM_PLAYER = 4;
var YOUR_ID = 2;
var MAX_RATE = 5;
//変数の定義
var money = new Array(NUM_PLAYER);
var parentId = 0;
var childId = 0;
var latch;
var diceResult = [];
var payMoney;
var yakuParent = new yaku("", 0);
var yakuChild = new yaku("", 0);
var resultYaku = new yaku("", 0); //yaku一時保存用
var end = 0; //ゲーム中は0, ゲーム終了したら1
var winner;

//html上の場所を定義
var showParent = document.getElementById('showParent');
var showChild = document.getElementById('showChild');
var comment1 = document.getElementById('comment1');
var next = document.getElementById('next');
var diceImg = [
    document.getElementById('diceImg1'),
    document.getElementById('diceImg2'),
    document.getElementById('diceImg3')
];
var moneyShow = [
    document.getElementById('money1'),
    document.getElementById('money2'),
    document.getElementById('money3'),
    document.getElementById('money4')
];
//ゲームを始める
$('#moneyDecide').click(function () {
    //所持金の設定
    for (var i = 0; i < NUM_PLAYER; i++) {
        money[i] = Number(document.getElementById('cash').value);
    }
    showMoney();　 //所持金を表示
    $('#start').hide(); //startを隠す　
    $('#field').fadeIn(500); //fieldを表示
});
$('.game').click(function () {
    $('#next').hide();
    //親と子の設定
    if (childId == NUM_PLAYER - 1) {
        parentId++;
        childId = 0;
    } else {
        childId++;
    }
    if (parentId == childId) {
        childId++;
    }
    //サイコロ画像とコメントの削除
    $('#diceImg1').hide();
    $('#diceImg2').hide();
    $('#diceImg3').hide();
    comment1.innerText = "";
    showParentChild().then(function (result) {
        oneParentVsChild().then(function (result) {
            nextGame();
        });
    });
});
//親と子の表示
function showParentChild() {
    return new Promise(function (resolve) {
        showParent.innerText = "親: " + getPlayerName(parentId);
        showChild.innerText = "子: " + getPlayerName(childId);
        console.log("親：　" + getPlayerName(parentId) + "子：　" + getPlayerName(childId));
        var message1 = "親は" + getPlayerName(parentId) + "です。";
        var message2 = "子は" + getPlayerName(childId) + "です。";
        showMsgAndHoldon(message1,1000).then(function (result) {
            showMsgAndHoldon(message2,1000).then(function (result) {
                resolve(null);
            });
        });
    });
}

function nextGame() {
    return new Promise(function (resolve, reject) {
        if (childId == NUM_PLAYER - 2 && parentId == NUM_PLAYER - 1) {
            endGame();
            return;
        } else {
            showNext();
        }
        resolve(null);
    });
}
//勝負する
function oneParentVsChild() {
    return new Promise(function (resolve, reject) {
        getLatch().then(function (result) {
            getYaku("親").then(function (result) {
            	yakuParent=$.extend(true, {}, result);
            	comment1.innerText = "!!!!!";
                $('#diceImg1').hide();
                $('#diceImg2').hide();
                $('#diceImg3').hide();
                getYaku("子").then(function (result) {
                    yakuChild=$.extend(true, {}, result);
                    wait().then(function(result) {
                    	showResult().then(function (result) {
                        showMoney();
                        if (money[parentId] < 0) {
                    			comment1.innerText = "親の所持金がなくなりました";
                    			setTimeout(function() {
                            endGame();
                            return;
                          }, 2000);
                        }
                        resolve(null);
                      });
                    });
                });
            });
        });
    });
}
//役の取得
function getYaku(who) {
    return new Promise(function (resolve, reject) {
        comment1.innerText = who + "がサイコロを振ります";
        diceResult = [];　 //サイコロ配列を初期化
        throwDice().then(function (result) {
            getNameRate();

            console.log(resultYaku);
            resolve(resultYaku);
        });
    });
}
//サイコロを振る
function throwDice() {
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < NUM_DICE; i++) {
            diceResult.push(Math.floor(Math.random() * 6) + 1);
        }
        //サイコロイメージを表示
        for (var i = 0; i < NUM_DICE; i++) {
            var image = diceImg[i]
            image.src = "./image/" + diceResult[i] + ".png";
        }
        wait().then(function (result) {
            showDice().then(function (result) {
                resolve(null);
            });
        });
    });

    function showDice() {
        return new Promise(function (resolve, reject) {
            $('#diceImg1').fadeIn(1000);
            $('#diceImg2').fadeIn(2000);
            $('#diceImg3').fadeIn(3000);
            setTimeout(function () {
                resolve(null)
            }, 3000);
        });
    }
}
//掛け金を設定
function getLatch() {
    return new Promise(function (resolve, reject) {
        latch = 0;
        if (childId == YOUR_ID) {
            while (latch < 1 || latch > Math.floor(money[childId] / MAX_RATE)) {
                latch = prompt('掛け金を入力してください\n\n入力できる掛け金は \n 1-' + Math.floor(money[childId] / MAX_RATE) + '\n です');
                if (latch < 1 || latch > Math.floor(money[childId] / MAX_RATE)) {
                    alert('1-' + Math.floor(money[childId] / MAX_RATE) + 'の数字を入力してください');
                }
            }
        } else {;
            latch = Math.floor(Math.random() * (money[childId] / MAX_RATE)) + 1;
        }
        comment1.innerText = "掛け金は" + latch + " ペリカ です";
        console.log("掛け金: " + latch);
        resolve(null);
    });
}
//次へボタンを表示
function showNext() {
    if (end == 0) {
        $('#next').fadeIn(1);
    }
}
//結果を表示
function showResult() {
    var payFrom = null;
    var payTo = null;
    return new Promise(function (resolve, reject) {
        	if (yakuParent.rate > yakuChild.rate) {
            	comment1.innerText = "親の勝ちです";
            	if (yakuChild.rate < -1) {
                	payMoney = yakuChild.rate * latch * (-1);
            	} else {
	                payMoney = yakuParent.rate * latch;
	            }
                payFrom = "子";
                payTo = "親";
  	            showPayMoney().then(function(result) {
                  //支払い
                 	money[childId] = Number(money[childId]) - payMoney;
                 	money[parentId] = Number(money[parentId]) + payMoney;
                 	resolve(null);
                });
        	} else if (yakuParent.rate == yakuChild.rate) {
            	comment1.innerText = "引き分けです";
            	setTimeout('comment1.innerText = "支払いはありません"', 1000);
              resolve(null);
        	} else {
            	comment1.innerText = "子の勝ちです";
            	if (yakuParent.rate < -1) {
                	payMoney = yakuParent.rate * latch * (-1);
            	} else {
                	payMoney = yakuChild.rate * latch;
            	}
              payFrom = "親";
              payTo = "子";
              showPayMoney().then(function(result) {
                //支払い
                money[childId] = Number(money[childId]) - payMoney;
                money[parentId] = Number(money[parentId]) + payMoney;
                resolve(null);
              });
        	}
    });
    //支払額を表示
    function showPayMoney() {
      return new Promise(function (resolve) {
        setTimeout(function() {
          comment1.innerText = payFrom + "は" + payTo + "に" + payMoney + "ペリカを支払います"
        },1000);
      });
    }
}

function endGame() {
    end = 1;
    showMoney();
    //サイコロ画像の削除
    $('#diceImg1').hide();
    $('#diceImg2').hide();
    $('#diceImg3').hide();
    setTimeout('comment1.innerText = "ゲーム終了"', 1000);
    winner = getWinPlayer();
    setTimeout('showWinner()', 2000);
}

function showWinner() {
    comment1.innerText = "勝者は" + getPlayerName(winner) + "でした";
}

function getWinPlayer() {
    var sortMoney = new Array(NUM_PLAYER);
    sortMoney = bubleSort(money);
    for (var i = 0; i < NUM_PLAYER; i++) {
        if (money[i] == sortMoney[NUM_PLAYER - 1]) {
            winner = i;
        }
    }
    return winner;
}

function getNameRate() {
    //サイコロの目を昇順に並べ替える
    diceResult = bubbleSort(diceResult);
    //出た目によってnameとrateを決める
    if (diceResult[0] == diceResult[1] && diceResult[0] == diceResult[2]) {
        if (diceResult[0] == 1) {
            resultYaku.name = "ピンゾロ";
            resultYaku.rate = 5;
        } else {
            resultYaku.name = "ゾロ目";
            resultYaku.rate = 3;
        }
    } else if (diceResult[0] == 4 && diceResult[1] == 5 && diceResult[2] == 6) {
        resultYaku.name = "シゴロ";
        resultYaku.rate = 2;
    } else if (diceResult[0] == diceResult[1]) {
        resultYaku.name = diceResult[2] + "の目";
        resultYaku.rate = 1;
    } else if (diceResult[1] == diceResult[2]) {
        resultYaku.name = diceResult[0] + "の目";
        resultYaku.rate = 1;
    } else if (diceResult[0] == 1 && diceResult[1] == 2 && diceResult[2] == 3) {
        resultYaku.name = "ヒフミ";
        resultYaku.rate = -2;
    } else {
        resultYaku.name = "クズ";
        resultYaku.rate = -1;
    }
}

//プレーヤー番号から名前を取得
function getPlayerName(num) {
    var playerName;
    switch (num) {
    case 0:
        playerName = "Player1";
        return playerName;
    case 1:
        playerName = "Player2";
        return playerName;
    case 2:
        playerName = "あなた";
        return playerName;
    case 3:
        playerName = "Player3";
        return playerName;
    }
}

function showMoney() {
    return new Promise(function (resolve) {
      for (var i = 0; i < NUM_PLAYER; i++) {
        moneyShow[i].innerText = "所持金: " + money[i];
      }
    });
}

function showMsgAndHoldon(message, sleepTime) {
    return new Promise(function (resolve) {
        comment1.innerText = message;
        setTimeout(function () {
            resolve(null)
        }, sleepTime);
    });
}


function wait() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(null)
        }, 1000);
    });
}
