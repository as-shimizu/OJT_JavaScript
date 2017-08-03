var money = 100000; //所持金

// 役のクラスを定義
var yaku = function(name, rate) {
    // メンバ変数 (インスタンス変数)
    this.name = name;
    this.rate  = rate;
}
var numDice = 3;


//所持金を設定
$('#cash').click(function() {
    money += $('#money');
});

//サイコロを振る　がクリックされたら
$('#dice').click(function() {
    //掛け金を設定
    var latch = $('#latch');
    console.log(latch);
    
    if(latch == "" ) {
        alert("掛け金を入力してください");
    } else if(latch <= 0 ) {
    	alert("0以上の数字を入力してください");
    } else if(latch > money) {
        alert("所持金が足りません");
    } else {
    	//掛け金が正しく入力された時の処理
        var dice = throwDice();
        
        //サイコロの画像を表示
        console.log(dice);
        //役とレートの取得
        var result = getNameRate(dice);
        
        var changeMoney = latch * result.rate;
        money += changeMoney;
        
        //HTMLに出力
        console.log(result.name, result.rate, changeMoney,money);
    }
});


function throwDice() {
    var dice = [];
    for(var i=0; i<numDice; i++) {
        dice.push(Math.floor(Math.random()*6) + 1);
    }
    return dice;
}

function getNameRate(dice) {
    //サイコロの目を昇順に並べ替える
    dice = bubleSort(dice);
    
    //出た目によってnameとrateを決める

    if(dice[0]==dice[1] && dice[0]==dice[2]) {
        if(dice[0]==1) {
            var result = new yaku("ピンゾロ",5);
            return result;
        } else {
            var result = new yaku("ゾロ目",3);
            return result;
        }
    } else if(dice[0]==4 && dice[1]==5 && dice[2]==6) {
        var result = new yaku("シゴロ",2);
        return result;
    } else if(dice[0]==dice[1]) {
        var result = new yaku(dice[2] + "の目",1);
        return result;
    } else if(dice[1]==dice[2]) {
        var result = new yaku(dice[0] + "の目",1);
        return result;
    } else if(dice[0]==1 && dice[1]==2 && dice[2]==3) {
        var result = new yaku("ヒフミ",-2);
        return result;
    } 
    var result = new yaku("目なし",-1);
    return result;
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
