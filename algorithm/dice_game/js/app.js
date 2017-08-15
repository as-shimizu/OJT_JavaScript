// 役のクラスを定義
var yaku = function(name, rate) {
    // メンバ変数 (インスタンス変数)
    this.name = name;
    this.rate  = rate;
}

//変数の定義
var money = 100000; //所持金
var numDice = 3;
var resultYaku = new yaku("",0);
var diceImg = [
  document.getElementById('diceImg1'),
  document.getElementById('diceImg2'),
  document.getElementById('diceImg3')
];


//所持金を設定
$('#cash').click(function() {
    money += $('#money');
});

//サイコロを振る　がクリックされたら
$('#dice').click(function() {
    //掛け金を設定
    var latch = document.getElementById('latch').value;

    if(latch == "" ) {
        alert("掛け金を入力してください");
    } else if(latch <= 0 ) {
    	alert("0以上の数字を入力してください");
    } else if(latch > money) {
        alert("所持金が足りません");
    } else {
    	//掛け金が正しく入力された時の処理

        //サイコロ画像の削除
        $('#diceImg1').fadeOut(1000)
        $('#diceImg2').fadeOut(1500);
        $('#diceImg3').fadeOut(2000);
        //サイコロを投げる
        var dice = throwDice();
        //役とレートの取得
        getNameRate(dice);
        var yakuName = document.getElementById('yakuName');
        $('#yakuName').innerText = 'resultYaku.name';

        //お金計算
        var changeMoney = latch * resultYaku.rate;
        money += changeMoney;

        //HTMLに出力
        console.log(resultYaku.name, resultYaku.rate, changeMoney,money);
    }
});

//サイコロを振る
function throwDice() {
    var dice = [];
    for(var i=0; i<numDice; i++) {
        dice.push(Math.floor(Math.random()*6) + 1);
    }
    //サイコロイメージを表示
    for(var i=0; i<numDice; i++) {
      var image = diceImg[i]
      image.src="./image/" + dice[i] + ".png";
    }
    $('#diceImg1').fadeIn(1000)
    $('#diceImg2').fadeIn(1500);
    $('#diceImg3').fadeIn(2000);

    return dice;
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
      resultYaku = new yaku("目なし",-1);
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

//setTimeoutのための関数
function waite() {
  //何もしない
}
