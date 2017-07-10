//ソート
//バブルソート、ヒープソート、マージソート、クイックソート


//データを選択されたファイルから読み込む
$(function () {
  var selfile = document.getElementById("selfile");
  selfile.addEventListener("change",function(evt) {
    var file = evt.target.files;
    var reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function(ev) {
      var lines = reader.result.split("\n");
      var data =[];

      for (var i=0; i<lines.length -1; i++) {
        var column = lines[i].split(",");
        data.push(column[0]);
      }

//処理をおこなう
    $('#sort').click(function() {
      //バブルソート
      var startTime = new Date(); //開始時間の取得
      var resultBulb = bulbSort(data);
      var endTime = new Date();　//終了時間の取得
      var time = endTime.getTime() - startTime.getTime();


    })
    }//reader.onload = function(ev) {
  });//selfile.addEventListener("change",function(evt)
});//$(function ()


//関数の定義

//バブルソート
function bulbSort (data) {
  if(data.length > 1) {
    for(var i=0; i < data.length-1; i++) {
      if(i+1 >= data.length - 1) {
        break;
      }
      for (var j=i+1; j < data.length; j++) {
        if(data[i] > data[j]) {
          data = change(data,i,j);
        }
      }
    }
  }
  return data;
}

//ヒープソート

//マージソート


//クイックソート



//その他の関数
//順番を入れ替える
function change(data,i,j) {
  var prov = data[i];
  data[i] = data[j];
  data[j] = prov;
  return data;
}

//出力用の表の作成
