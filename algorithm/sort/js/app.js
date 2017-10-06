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
    console.log(reader.result)
    var lines = reader.result.split("\n");
    for (var i = 0; i < lines.length - 1; i++) {
      data.push(Number(lines[i]));
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
function bubleSort(datab) {
    if (datab.length > 1) { 　//datab配列に2つ以上の数値が格納されている時
        for (var j = 0; j <= datab.length; j++) {
        	for (var i = 0; i <= datab.length - 1; i++) {
        		if (datab[i] > datab[i+1]) {
        			datab = change(datab, i, i+1); //i番目とi+1番目を比較し、i+1番目の方が大きければ入れ替える
            	}
            }
        }
    }
    return datab;
}
//ヒープソート
function heapSort(data) {
    var aryH = data.concat();
    var Heap = [];　//ヒープ構造の根(一番小さい値)を順に格納
    var outputAry = []; //1回のsortHeap結果のヒープ構造を一時的に格納

    while (aryH.length > 0) {
        outputAry = sortHeap(aryH);　//ヒープ構造を作り、outputAryに格納
        Heap.push(outputAry[0]);　//ヒープ構造の根(一番小さい値)をHeapに格納
        outputAry[0] = outputAry[outputAry.length - 1];　//Heapに格納した数値の場所に、ヒープ構造の末端の値を入れる
        outputAry.pop();　//output[0]に入れた数値を削除
        aryH = outputAry.concat();　//aryHを更新
        outputAry = [];　//outputaryをリセット
    }
    return Heap;
}
//根に一番小さい値をもってくる関数
function sortHeap(data) {
    var hplength = Math.floor(data.length / 2);　//ヒープ構造の長さはデータの半分(小数点以下切り捨て)
    for (var i = hplength; i > 0; i--) {
    	//親と子を比較し、一番小さい値を親に持ってくる
    	//親がi番目のデータ(data[i-1])の時、子は2*i番目(data[2*i -1])と(2*i)+1番目(data[2*i])
        if (data[i - 1] > data[2 * i] && 2 * i < data.length) {
            data = change(data, i - 1, 2 * i);
        }
        if (data[i - 1] > data[(2 * i) - 1] && (2 * i) - 1 < data.length) {
            data = change(data, i - 1, (2 * i) - 1);
        }
    }
    return data;
}
//マージソートを行う関数
function mergeSort(data) {
    var i = 0;
    var j = 0;
    var inputSize = 0;
    var inputArray = data.concat();//はじめはdataに含まれる数値は1つ1つ長さ1の配列と考える
    var outputArray = [];

    while (inputArray.length != 1) {
        j = 0;
        inputSize = inputArray.length - 1;
        //隣り合う2つの配列をマージして1つの配列にする
        while (j + 1 <= inputSize) {
            outputArray.push(merge(inputArray[j], inputArray[j + 1]));
            j += 2;
        }
        //配列数が奇数の場合、最後の1つはマージせずそのままoutputArrayにいれる
        while (inputSize >= j) {
            outputArray.push(inputArray[j]);
            j++
        }
        inputArray = outputArray.concat();　// 次のループでは出来上がったoutputArrayをinputArrayとして同じ作業をする
        outputArray = [];
    }//inputArrayの配列数が1になったら終わる
    var result = [];
    for (var i = 0; i < inputArray[0].length; i++) {
        result.push(inputArray[0][i])
    }
    return result;
}
//マージソートの中でマージする際の関数
//昇順に並んだ2つのデータセットを1つにあわせる
function merge(d1, d2) {
    var newData = [];
    var i1 = 0;
    var i2 = 0;
    var check = 0;
    if (d1.length > 1) { //d1,d2を確認してdata1,data2に格納する
        var len1 = d1.length;
        var data1 = d1.concat();
    } else {
        var len1 = 1;
        var data1 = [];　//配列の長さが１の場合も、長さ1の配列としてdata1を定義
        data1.push(d1);
    }
    if (d2.length > 1) {
        var len2 = d2.length;
        var data2 = d2.concat();
    } else {
        var len2 = 1;
        var data2 = [];
        data2.push(d2);
    }
    while (i1 < len1 || i2 < len2) {
        check++;
        //data[i1]とdata[i2]を比較し、小さいほうをnewDataに格納
        //data[i1]==data[i2}]の場合は両方newDataに格納されるよう、if文を2つに分けた
        if (data1[i1] < data2[i2]) {
            newData.push(data1[i1]);
            i1++;
        } else if (data1[i1] > data2[i2]) {
            newData.push(data2[i2]);
            i2++;
        } else if (data1[i1] == data2[i2]) {
            newData.push(data1[i1]);
            i1++;
            newData.push(data2[i2]);
            i2++;
        } else {
        	break;
        }
    }
    //一方の配列の数値が全てnewDataに格納された場合、もう一方の配列はそのままnewDataに追加する
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
    var ary0 = data.concat();　//ソートするデータを格納(listAry2から順に受け渡される)
    var listAry2 = [];　//ソートする配列を格納する(ary0になる配列を格納/順番待ちの配列)
    var resultAry = []; //ソート結果を格納
    var a = 0;　//listAry2[a]がlistAry2の最後の配列
    while (resultAry.length < data.length) {
        //ary0を確認する
        if (checkTheArray(ary0) < 0) { //配列内の数値が全て等しい場合の処理
            if (ary0.length == 1) {
                resultAry.push(ary0[0]);　//長さ1の場合はそのままresultAryに追加
            } else {
                for (var i=0 ; i < ary0.length; i++) {
                    resultAry.push(ary0[i]);　//全てresultAryに追加
                }
            }
            if (listAry2.length == 0) {
                break;
            }
            a = listAry2.length - 1　//listAry2の最後の配列をary0に格納し、listAry2から削除
            ary0 = listAry2[a].concat();
            listAry2.pop();
        } else {　//配列内に異なる数値が含まれる場合の処理
            var devideAry = devide(ary0).concat();
            if (devideAry[1].length > 0) {
                listAry2.push(devideAry[1]); //分割した配列のうち、値の大きいほうはlistAry2に格納
            }
            ary0 = devideAry[0].concat();　//値の小さいほうの配列はary0に格納し、次のループでソートする
        }
    }
    return resultAry;
}
//値xを基準にパーディションを分ける関数
//xはary0のはじめの2つの数字のうち、大きいほう

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
            part1.push(ary0[i]);　//part1はxより小さい値
        } else {
            part2.push(ary0[i]);　//part2はx以上の値
    	}
    }
    var result = [part1, part2];
    return result;
}
//aryの値が全て同じ場合-1をかえす関数
function checkTheArray(data) {
    var count = 0;
    var result = 1; //aryの値が全て同じではない場合は1をかえす
    if (data.length == 1) { //aryの長さが1のときも-1をかえす
        result = -1;
    } else {
        for (var i = 0; i < data.length; i++) {
            if (data[0] == data[i]) {
                count++; //data[0]と等しい値を持つデータ数を数える
            }
        }
        if (count == data.length) {
            result = -1;　//countとdataのデータ数が一致すれば、配列全ての値が等しい
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
    //"test"にふくまれる、id=viewTableのtable Elementを一度消す
    document.getElementById("test").removeChild(viewTable);

    //新たにid=viewTableを作成する
    var table = document.createElement("table");
    table.setAttribute('id', 'viewTable');

    //作成したviewTableにデータをいれる
    for (var i = 0; i < result.length; i++) {
        row.push(table.insertRow(-1));
        cell = row[i].insertCell(-1);
        cell.appendChild(document.createTextNode(result[i]));
    }
    //作成した表を画面に表示させる
    document.getElementById("test").appendChild(table);
}
