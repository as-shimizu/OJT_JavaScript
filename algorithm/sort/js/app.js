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
        data.push(Number(column[0]));
      }

//処理をおこなう
    $('#sort').click(function() {
      //バブルソート
      var startTime = new Date(); //開始時間の取得
      var resultBulb = data.concat();
      resultBulb = bulbSort(resultBulb);
      var endTime = new Date();　//終了時間の取得
      var time = endTime.getTime() - startTime.getTime();
      //表示
      resultBulb.unshift("バブルソート");
      resultBulb.push('所要時間：' + time);
      mergeSort(data);

    })
    }//reader.onload = function(ev) {
  });//selfile.addEventListener("change",function(evt)
});//$(function ()


//関数の定義

//バブルソート
function bulbSort (data) {
  var datab = data;
  if(datab.length > 1) {
    for(var i=0; i < datab.length-1; i++) {
      if(i+1 >= datab.length - 1) {
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

/*ヒープソート
function heapSort(data) {

}*/

//マージソートを行う関数
function mergeSort(data) {
  var i = 0;
  var j=0;
  var inputSize = 0;
  var inputArray = data.concat();
  var outputArray = [];
  console.log(inputArray);

  while(inputArray.length != 1) {
    	j=0;
    	inputSize = inputArray.length -1;
    	while(j+1<inputSize) {
      		outputArray.push(merge(inputArray[j],inputArray[j+1]));
      		j += 2;
    	}
    	while(inputSize >= j) {
      		outputArray.push(inputArray[j]);
      		j++
    	}
//console.log(inputArray);
//console.log(outputArray);

    	inputArray = outputArray.concat();
    	outputArray = [];

  	}
  console.log(inputArray);
}

//マージソートの中でマージする際の関数
function merge(d1, d2) {
  var newData = [];
  var i1 = 0;
  var i2 = 0;
  var check = 0;

  if(d1.length > 1) {
  	var len1 = d1.length;
  	var data1 = d1;
  } else {
  	var len1 = 1;
  	var data1 = [];
  	data1.push(d1);
  	
  }
  if(d2.length > 1) {
  	var len2 = d2.length;
  	var data2 = d2;
  } else {
  	var len2 = 1;
  	var data2 = [];
  	data2.push(d2);
  }

  while(i1<len1 || i2<len2) {
  	check++;
    if(data1[i1]<data2[i2]) {
      newData.push(data1[i1]);
      i1++;
    } else if (data1[i1]>data2[i2]) {
      newData.push(data2[i2]);
      i2++;
    } else {
    	break;
    }
  }
   
  while(i1!=len1 || i2!=len2) {
    if(i1<len1) {
    	newData.push(data1[i1]);
    	i1++;
    	console.log("case1");
    	if(i1==len1) {
    		break;
    	}
    } else if(i2<len2) {
    	newData.push(data2[i2]);
    	i2++;
    	console.log("case2");
    	if(i2==len2) {
    		break;
    	}
    }
  }
  console.log(newData);
  return newData;
}

//クイックソート
/*function quickSort(data) {
  var compare = data[0];
  var ary1;
  var ary2;

  for(var i=0; i<data.length; i++) {
    if(data[i]<compare) {
      ary1.push(data[i]);
    } else {
      ary2.push(data[i]);
    }
  }

  for(i=0; )

}*/


//その他の関数
//順番を入れ替える
function change(data,i,j) {
  var prov = data[i];
  data[i] = data[j];
  data[j] = prov;
  return data;
}

//出力用の表の作成
function createTable(result,ncol) {
  var row = [];
  var table = document.createElement("table");
  for(var i=0; i<result.length; i++) {
    row.push(table.insertRow(-1));
    //for(var j=0; j<ncol; j++) {
      cell=row[i].insertCell(-1);
      cell.appendChild(document.createTextNode(result[i]));
  //  }
  }
  document.getElementById("test").appendChild(table);
  //console.log(table);
}
