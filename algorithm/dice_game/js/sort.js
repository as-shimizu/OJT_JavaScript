//バブルソート
function bubbleSort(data) {
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