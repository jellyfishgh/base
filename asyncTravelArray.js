function createArr(count){
	var arr = new Array();
	for(var i = 0; i < count; i++){
		arr.push(Math.ceil(Math.random()*count));
	}
	return arr;
}

function printArr(arr){
	for(var key in arr){
		console.log(arr[key]);
	}
	console.log("-------");
}

function next1(i, arr, callback){
	if(i < arr.length){
		console.log(arr[i])
		arguments.callee(i+1, arr, callback);
	}else{
		callback(arr[i-1]);
	}
}

function next2(i, arr, count, callback){
	function foo(x){
		console.log(arr[x]);
		if(++count === arr.length){
			callback(arr[x]);
		}
	}
	for(; i < arr.length; i++)foo(i);
}

var array = createArr(10);
printArr(array);

next1(0, array, function(item){
	console.log("next1-->last item in arr:" + item);
});

next2(0, array, 0, function(item){
	console.log("next2-->last item in arr:" + item);
});