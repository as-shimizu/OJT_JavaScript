/*function puts(str) {
 console.log(str);
 // �@ Promise�R���X�g���N�^�� new ���āApromise�I�u�W�F�N�g��Ԃ�
 return new Promise(function(resolve) {
   setTimeout(function() {
     resolve(null);
   }, 3000);
 });
}

// �A �@��promise�I�u�W�F�N�g�ɑ΂��� .then �Œl���Ԃ��Ă������̃R�[���o�b�N��ݒ肷��
puts('async1')
.then(function(result) { puts('async2')
.then(function(result) { puts('async3')})});

console.log('end');*/







console.log("start"); 
function sleep(milliSeconds) { 
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
	console.log("sleep���������܂����B");
} 
 	sleep(5000); // ���s����̂�5�b������ 
	console.log("end");