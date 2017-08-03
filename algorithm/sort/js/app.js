//ソート
//バブルソート、ヒープソート、マージソート、クイックソート
//入力されたデータ
var data = [];

//データを選択されたファイルから読み込む
$('#selfile').change(function(evt) {
  data = []; //data配列の初期化
  var file = evt.target.files; 
  var reader = new FileReader();
  reader.readAsText(file[0]);
  reader.onload = function (ev) {
    var lines = reader.result.split("\n");
    for (var i = 0; i < lines.length - 1; i++) {
      var column = lines[i].split(",");
      data.push(Number(column[0]));
    }
  }
});


//ボタンを押すと実行される処理
//バブルソート
$('#buble').click(function () {
    var startTime = new Date(); //開始時間の取得
    var resultBuble = data.concat();
    resultBulb = bubleSort(resultBuble);
    var endTime = new Date();　 //終了時間の取得
    var time = endTime.getTime() - startTime.getTime();
    //表示
    resultBuble.unshift("バブルソート");
    resultBuble.push('所要時間：' + time + 'ミリ秒');
    createTable(resultBuble);
})
//ヒープソート
$('#heap').click(function () {
    var startTime = new Date(); //開始時間の取得
    var resultHeap = data.concat();
    resultHeap = heapSort(resultHeap);
    var endTime = new Date();　 //終了時間の取得
    time = endTime.getTime() - startTime.getTime();
    //表示
    resultHeap.unshift("ヒープソート");
    resultHeap.push('所要時間：' + time + 'ミリ秒');
    createTable(resultHeap);
})
//マージソート    
$('#merge').click(function () {
    var startTime = new Date(); //開始時間の取得
    var resultMerge = data.concat();
    resultMerge = mergeSort(resultMerge);
    var endTime = new Date();　 //終了時間の取得
    time = endTime.getTime() - startTime.getTime();
    //表示
    resultMerge.unshift("マージソート");
    resultMerge.push('所要時間：' + time + 'ミリ秒');
    createTable(resultMerge);
})
//クイックソート
$('#quick').click(function () {
    var startTime = new Date(); //開始時間の取得
    var resultQUick = data.concat();
    resultQUick = quickSort(resultQUick);
    var endTime = new Date();　 //終了時間の取得
    time = endTime.getTime() - startTime.getTime();
    //表示
    resultQUick.unshift("クイックソート");
    resultQUick.push('所要時間：' + time + 'ミリ秒');
    createTable(resultQUick);
})
//JavaScriptのメソッド    
$('#js_method').click(function () {
    var startTime = new Date(); //開始時間の取得
    var resultJS = data.concat();
    resultJS.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    var endTime = new Date();　 //終了時間の取得
    time = endTime.getTime() - startTime.getTime();
    //表示
    resultJS.unshift("JSのメソッド");
    resultJS.push('所要時間：' + time + 'ミリ秒');
    createTable(resultJS);
})
//関数の定義
//バブルソート
function bubleSort(data) {
    var datab = data;
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
//ヒープソート
function heapSort(data) {
    var aryH = data.concat();
    var Heap = [];
    var outputAry = [];
    while (aryH.length > 0) {
        outputAry = SortHeap(aryH);
        Heap.push(outputAry[0]);
        outputAry[0] = outputAry[outputAry.length - 1];
        outputAry.pop();
        aryH = outputAry.concat();
        outputAry = [];
    }
    return Heap;
}
//根に一番小さい値をもってくる関数
function SortHeap(data) {
    var hplength = Math.floor(data.length / 2);
    for (var i = hplength; i > 0; i = i - 1) {
        if (data[i - 1] > data[2 * i] && 2 * i < data.length) {
            change(data, i - 1, 2 * i);
        }
        if (data[i - 1] > data[(2 * i) - 1] && (2 * i) - 1 < data.length) {
            change(data, i - 1, (2 * i) - 1);
        }
    }
    return data;
}
//マージソートを行う関数
function mergeSort(data) {
    var i = 0;
    var j = 0;
    var inputSize = 0;
    var inputArray = data.concat();
    var outputArray = [];
    while (inputArray.length != 1) {
        j = 0;
        inputSize = inputArray.length - 1;
        while (j + 1 <= inputSize) {
            outputArray.push(merge(inputArray[j], inputArray[j + 1]));
            j += 2;
        }
        while (inputSize >= j) {
            outputArray.push(inputArray[j]);
            j++
        }
        inputArray = outputArray.concat();
        outputArray = [];
    }
    var result = [];
    for (var i = 0; i < inputArray[0].length; i++) {
        result.push(inputArray[0][i])
    }
    return result;
}
//マージソートの中でマージする際の関数
function merge(d1, d2) {
    var newData = [];
    var i1 = 0;
    var i2 = 0;
    var check = 0;
    if (d1.length > 1) {
        var len1 = d1.length;
        var data1 = d1;
    } else {
        var len1 = 1;
        var data1 = [];
        data1.push(d1);
    }
    if (d2.length > 1) {
        var len2 = d2.length;
        var data2 = d2;
    } else {
        var len2 = 1;
        var data2 = [];
        data2.push(d2);
    }
    while (i1 < len1 || i2 < len2) {
        check++;
        if (data1[i1] < data2[i2]) {
            newData.push(data1[i1]);
            i1++;
        } else if (data1[i1] > data2[i2]) {
            newData.push(data2[i2]);
            i2++;
        } else {
            break;
        }
    }
    while (i1 != len1 || i2 != len2) {
        if (i1 < len1) {
            newData.push(data1[i1]);
            i1++;
            if (i1 == len1) {
                break;
            }
        } else if (i2 < len2) {
            newData.push(data2[i2]);
            i2++;
            if (i2 == len2) {
                break;
            }
        }
    }
    return newData;
}
//クイックソート
function quickSort(data) {
    var ary0 = data.concat();
    var listAry2 = [];
    var resultAry = [];
    var a = 0;
    while (resultAry.length < data.length) {
        if (checkTheArray(ary0) < 0) {
            if (ary0.length == 1) {
                resultAry.push(ary0[0]);
            } else {
                for (var i; i < ary0.length; i++) {
                    resultAry.push(ary0[i]);
                }
            }
            if (listAry2.length == 0) {
                break;
            }
            a = listAry2.length - 1
            ary0 = listAry2[a].concat();
            listAry2.pop();
        } else {
            var devideAry = devide(ary0);
            if (devideAry[1].length > 0) {
                listAry2.push(devideAry[1]);
            }
            ary0 = devideAry[0].concat();
        }
    }
    return resultAry;
}
//値xを基準にパーディションを分ける関数
function devide(ary0) {
    if (ary0[0] < ary0[1]) {
        var compare = ary0[1];
    } else {
        var compare = ary0[0];
    }
    var part1 = [];
    var part2 = [];
    for (var i = 0; i < ary0.length; i++) {
        if (ary0[i] < compare) {
            part1.push(ary0[i]);
        } else {
            part2.push(ary0[i]);
        }
    }
    var result = [part1, part2];
    return result;
}
//aryの値が全て同じ場合-1をかえす関数
function checkTheArray(data) {
    var count = 0;
    var result = 1;
    if (data.length == 1) {
        result = -1;
    } else {
        for (var i = 0; i < data.length; i++) {
            if (data[0] == data[i]) {
                count++
            }
        }
        if (count == data.length) {
            result = -1;
        }
    }
    return result;
}
//その他の関数
//順番を入れ替える
function change(data, i, j) {
    var prov = data[i];
    data[i] = data[j];
    data[j] = prov;
    return data;
}
//出力用の表の作成
function createTable(result) {
    var row = [];
    document.getElementById("test").removeChild(viewTable);
    
    var table = document.createElement("table");
    table.setAttribute('id', 'viewTable');
    for (var i = 0; i < result.length; i++) {
        row.push(table.insertRow(-1));
        cell = row[i].insertCell(-1);
        cell.appendChild(document.createTextNode(result[i]));
    }
    document.getElementById("test").appendChild(table);
}