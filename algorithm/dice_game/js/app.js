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
var a = 1;
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
var moneyView = [
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
    $('#start').fadeOut(1); //startを隠す　
    $('#field').fadeIn(500); //fieldを表示
});
$('.game').click(function () {
    $('#next').fadeOut(1);
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
    $('#diceImg1').fadeOut(1);
    $('#diceImg2').fadeOut(1);
    $('#diceImg3').fadeOut(1);
    comment1.innerText = "";
    viewParentChild().then(function (result) {
        oneChild().then(function (result) {
            nextGame();
        });
    });
});
//親と子の表示
function viewParentChild() {
    return new Promise(function (resolve) {
        showParent.innerText = "親: " + getPlayerName(parentId);
        showChild.innerText = "子: " + getPlayerName(childId);
        console.log("親：　" + getPlayerName(parentId) + "子：　" + getPlayerName(childId));
        var message1 = "親は" + getPlayerName(parentId) + "です。";
        var message2 = "子は" + getPlayerName(childId) + "です。";
        viewOnField(message1).then(function (result) {
            viewOnField(message2).then(function (result) {
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
function oneChild() {
    return new Promise(function (resolve, reject) {
        getLatch().then(function (result) {
            getParentYaku().then(function (result) {
                $('#diceImg1').fadeOut(1);
                $('#diceImg2').fadeOut(1);
                $('#diceImg3').fadeOut(1);
                getChildYaku().then(function (result) {
                    resultTarn().then(function (result) {
                        resolve(null);
                    });
                });
            });
        });
    });
}
//子が役の取得
function getChildYaku() {
    return new Promise(function (resolve, reject) {
        comment1.innerText = "子がサイコロを振ります";
        diceResult = [];　 //サイコロ配列を初期化
        throwDice().then(function (result) {
            getNameRate();
            comment1.innerHTML = resultYaku.name;
            yakuChild = $.extend(true, {}, resultYaku);
            console.log(yakuChild);
            resolve(null);
        });
    });
}
//親が役の取得
function getParentYaku() {
    return new Promise(function (resolve, reject) {
        comment1.innerText = "親がサイコロを振ります";
        diceResult = [];　 //サイコロ配列を初期化
        throwDice().then(function (result) {
            getNameRate();
            comment1.innerHTML = resultYaku.name;
            yakuParent = $.extend(true, {}, resultYaku);
            console.log(yakuParent);
            resolve(null);
        });
    });
}
//サイコロを振る
function throwDice() {
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < NUM_DICE; i++) {
            dice.push(Math.floor(Math.random() * 6) + 1);
        }
        //サイコロイメージを表示
        for (var i = 0; i < NUM_DICE; i++) {
            var image = diceImg[i]
            image.src = "./image/" + dice[i] + ".png";
        }
        wait().then(function (result) {
            viewDice().then(function (result) {
                resolve(null);
            });
        });
    });

    function viewDice() {
        return new Promise(function (resolve, reject) {
            $('#diceImg1').fadeIn(1000);
            $('#diceImg2').fadeIn(2000);
            $('#diceImg3').fadeIn(3000);
            setTimeout(function () {
                resolve(null)
            }, 3000);
        });
    }

    function wait() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(null)
            }, 1000);
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
        resolve(null)
    });
}
//次へボタンを表示
function showNext() {
    if (end == 0) {
        $('#next').fadeIn(1);
    }
}
//支払額を表示
function showChangeMoney(from, to) {
    comment1.innerText = from + "は" + to + "に" + payMoney + "ペリカを支払います";
}
//結果を表示
function resultTarn() {
    return new Promise(function (resolve, reject) {
        if (yakuParent.rate > yakuChild.rate) {
            comment1.innerText = "親の勝ちです";
            if (yakuChild.rate < -1) {
                payMoney = yakuChild.rate * latch * (-1);
            } else {
                payMoney = yakuParent.rate * latch;
            }
            setTimeout('showChangeMoney("子", "親")', 2000);
            //支払い
            money[childId] = Number(money[childId]) - payMoney;
            money[parentId] = Number(money[parentId]) + payMoney;
        } else if (yakuParent.rate == yakuChild.rate) {
            comment1.innerText = "引き分けです";
            setTimeout('comment1.innerText = "支払いはありません"', 2000);
        } else {
            comment1.innerText = "子の勝ちです";
            if (yakuParent.rate < -1) {
                payMoney = yakuParent.rate * latch * (-1);
            } else {
                payMoney = yakuChild.rate * latch;
            }
            setTimeout('showChangeMoney("親","子")', 2000);
            //支払い
            money[parentId] = Number(money[parentId]) - payMoney;
            money[childId] = Number(money[childId]) + payMoney;
            //親の所持金がなくなったらゲーム終了
            if (money[parentId] < 0) {
                setTimeout('comment1.innerText = "親の所持金がなくなりました"', 3000);
                end = 1;
                showMoney();
                setTimeout('endGame()', 4000);
            }
        }
        setTimeout('showMoney()', 3000);
        setTimeout(function () {
            resolve(null);
        }, 4000);
    });
}

function endGame() {
    end = 1
    //サイコロ画像の削除
    $('#diceImg1').fadeOut(1);
    $('#diceImg2').fadeOut(1);
    $('#diceImg3').fadeOut(1);
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
    diceResult = bubleSort(diceResult);
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
        //return result;
    } else if (diceResult[0] == diceResult[1]) {
        resultYaku.name = diceResult[2] + "の目";
        resultYaku.rate = 1;
        //return result;
    } else if (diceResult[1] == diceResult[2]) {
        resultYaku.name = diceResult[0] + "の目";
        resultYaku.rate = 1;
        //return result;
    } else if (diceResult[0] == 1 && diceResult[1] == 2 && diceResult[2] == 3) {
        resultYaku.name = "ヒフミ";
        resultYaku.rate = -2;
        //return result;
    } else {
        resultYaku.name = "クズ";
        resultYaku.rate = -1;
    }
}
//バブルソート
function bubleSort(data) {
    var datab = data.concat();
    if (datab.length > 1) {
        for (var i = 0; i < datab.length - 1; i++) {
            if (i + 1 >= datab.length) {
                break;
            }
            for (var j = i + 1; j < datab.length; j++) {
                if (datab[i] > datab[j]) {
                    datab = change(datab, i, j);
                }
            }
        }
    }
    return datab;
}
//順番を入れ替える
function change(data, i, j) {
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
    for (var i = 0; i < NUM_PLAYER; i++) {
        moneyView[i].innerText = "所持金: " + money[i];
    }
}

function viewOnField(message) {
    return new Promise(function (resolve) {
        comment1.innerText = message;
        setTimeout(function () {
            resolve(null)
        }, 1000);
    });
}
