/*function puts(str) {
 console.log(str);
 // ① Promiseコンストラクタを new して、promiseオブジェクトを返す
 return new Promise(function(resolve) {
   setTimeout(function() {
     resolve(null);
   }, 3000);
 });
}

// ② ①のpromiseオブジェクトに対して .then で値が返ってきた時のコールバックを設定する
puts('async1')
.then(function(result) { puts('async2')
.then(function(result) { puts('async3')})});

console.log('end');*/







console.log("start"); 
function sleep(milliSeconds) { 
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
	console.log("sleepが完了しました。");
} 
 	sleep(5000); // 実行するのに5秒かかる 
	console.log("end");