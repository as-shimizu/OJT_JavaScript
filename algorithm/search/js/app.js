
var data = getCSV("odd.csv");



//（１）線形探索
function linerResearch (data,target) {
  var num = -1;
  for (var i=0; i<data.length; i++) {
    if(data[i]===target) {
      num = i
      break;
    }
  }
  //検索する数がリストになかった場合
  if (num<0) {
    num = null;
  }
  return num;
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
