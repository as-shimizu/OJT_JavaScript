
$(function () {
  var selfile = document.getElementById("selfile");
  selfile.addEventListener("change",function(evt) {
    var file = evt.target.files;
    var reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function(ev) {
      var lines = reader.result.split("\n");
      var data =[];

      for (var i=0; i<lines.length; i++) {
        var column = lines[i].split(",");
        data.push(column[0]);
      }

      //検索ボタンが押された時
      $('#search').click(function() {
        //検索値の取得
        var textarea = document.getElementById("target").value;
        var target = Number(textarea);

        //線形探索で検索する
        var startTime = new Date(); //開始時間の取得
        var msg = linerSearch(data, target);
        var endTime = new Date();　//終了時間の取得
        var time = endTime.getTime() - startTime.getTime();

        //結果出力
        var result1 = document.getElementById("result1");
        result1.innerText = msg + '所要時間：' + time + ' (ミリ秒)';
        //$('#result').show();

        //二分探索で検索する
        var startTime = new Date(); //開始時間の取得
        var msg = binarySearch(data, target);
        var endTime = new Date();　//終了時間の取得
        var time = endTime.getTime() - startTime.getTime();

        //結果出力
        var result2 = document.getElementById("result2");
        result2.innerText = msg + '所要時間：' + time + ' (ミリ秒)';
        $('#result').show();
      }) //（検索ボタンを押したとき）

      // 最大値ボタンを押したとき
      $('#search').click(function() {
        //線形探索で検索する
        var startTime = new Date(); //開始時間の取得
        var msg = linerMax(data);
        var endTime = new Date();　//終了時間の取得
        var time = endTime.getTime() - startTime.getTime();

        //結果出力
        var result1 = document.getElementById("result1");
        result1.innerText = msg + '所要時間：' + time + ' (ミリ秒)';

        //javascriptの探索メソッドを利用
        var startTime = new Date(); //開始時間の取得
        var msg = jsMax(data);
        var endTime = new Date();　//終了時間の取得
        var time = endTime.getTime() - startTime.getTime();

        //結果出力
        var result2 = document.getElementById("result2");
        result2.innerText = msg + '所要時間：' + time + ' (ミリ秒)';
        $('#result').show();

      }//(最大値ボタンを押したとき)
    } //reader.onload = function(ev) {
  })//selfile.addEventListener("change",function(evt)
})//$(function ()


//（１）線形探索
function linerSearch (data,target) {
  var num = -1;
  for (var i=0; i<data.length; i++) {
    if(data[i]==target) {
      num = i+1
      break;
    }
  }

  //メッセージ表示
  var msg = '[線形探索]　' + message(num,target);
  return msg;
}

//(2)二分探索
function binarySearch (data, target) {
  var maxNum = data.length-1
  var minNum = 0
  var mid = -1;
  var msg = '[二分探索]　';
  var num = -1;

  while(minNum < maxNum) {
    mid = Math.ceil((maxNum - minNum) / 2) + minNum;
    console.log(minNum, maxNum,mid, data[mid],target);
    if(data[mid]==target) {
      num = mid + 1
      break;
    } else if(maxNum == mid) {
      break;
    } else if(data[mid]>target) {
      maxNum = mid
    } else {
      minNum = mid
    }
  }
  //メッセージ表示
  var msg = '[二分探索]　' + message(num,target);
  return msg;
}

//表示メッセージを作成する関数
function message(num,target) {
  if (num>0) {
    msg = target + 'はリストの' + num + '番目でした。'
  } else {
    msg = target + 'はリストに存在しませんでした。'
  }
  return msg;
}

//線形探索（最大値）
function linerMax(data) {
  var max = 0;

  for (var i=0; i<data.length; i++) {
    if(max<data[i]) {
      max = data[i];
    }
  }
  return max;
}

//線形探索（最小値）
function linerMax(data) {
  var min = 0;

  for (var i=0; i<data.length; i++) {
    if(min>data[i]) {
      min = data[i];
    }
  }
  return min;
}

//JavaScriptのメソッドで探索する
/*//CSVファイルを読み込む関数
function getCSV(filename) {
  var request = new XMLHttpRequest();
  request.open("get", filename, false);
  request.send(null);

  var csvData = request.responseText;
  var lines = csvData.split("\n");
  var data = [];

  for (var i=0; i<lines.length; i++) {
    var column = lines[i].split(",");
    data.push(column[0]);
  }
  return data;
}

//テキストファイルで読み込む
function getData() {
  var file = evt.target.files;
  var reader = new FileReader();
  reader.readAsText(file[0]);
  reader.onload = function(ev) {
    var lines = reader.result.split("\n");
    var data =[];

    for (var i=0; i<lines.length; i++) {
      var column = lines[i].split(",");
      data.push(column[0]);
    }
    console.log(data);
    return data;
  }
}*/
