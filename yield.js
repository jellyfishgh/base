function* fabonaciiSequence(count){
	var result = [1, 1];
	for(let i = 2; i < count; i++){
		result[i] = result[i-1] + result[i-2];
		yield result[i];
	}
}

var generator = fabonaciiSequence(10);
try{
	var item;
	while(item = generator.next()){
		console.log(item);
	}
}catch(e){
	
}finally{
	generator.close();
}