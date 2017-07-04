
var data = getCSV("odd.csv");

$(function () {
  //検索ボタンが押された時
  $('#search').click(function() {
    //検索値の取得
    var textarea = document.getElementById("target").value;
    var target = Number(textarea);

    //線形探索で検索する
    var msg = linerResearch(data, target);

    //結果出力
    var result = document.getElementById("result");
    result.innerText = msg;
    $('#result').show();
  })
})


//（１）線形探索
function linerResearch (data,target) {
  var num = -1;
  for (var i=0; i<data.length; i++) {
    if(data[i]==target) {
      num = i+1
      break;
    }
  }
  //検索する数がリストになかった場合
  var msg = '';
  if (num>0) {
    msg = target + 'はリストの' + num + '番目でした'
  } else {
    msg = target + 'はリストに存在しませんでした'
  }
  return msg;
}



//CSVファイルを読み込む関数
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
