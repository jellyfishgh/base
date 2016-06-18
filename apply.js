function splitLine(){
	 console.log("###############################################");
}

/*
	Using apply to chain constructors
 */
 Function.prototype.construct1 = function(args){
	 var oNew = Object.create(this.prototype);
	 this.apply(oNew, args);
	 return oNew;
 }
 Function.prototype.construct2 = function(args){
	 var Constructor = this;
	 function NewConstructor(){
		 Constructor.apply(this, args);
	 };
	 NewConstructor.prototype = Constructor.prototype;
	 return new NewConstructor();
 }
 
 var arr = [1, "hello world", {name:"Jellyfish",age:22}];
 function MyConstructor(){
	 for (var key in arguments) {
		 if (arguments.hasOwnProperty(key)) {
			 this[key] = arguments[key];
		 }
	 }
 }
 function initInstance(Construcotr, construct, args){
	var myInstance = Construcotr[construct](args);
 	console.log(myInstance);
 	console.log(myInstance instanceof Construcotr);
 	console.log(myInstance.constructor);
 }
 initInstance(MyConstructor, "construct1", arr);
 initInstance(MyConstructor, "construct2", arr);
 
 splitLine();
 
 /*
 	Using apply and built-in functions
 */
 /*
 元素足够多的数组中找打最大值或最小值
 flag:true时取最大值
 */
 function endOfBigArray(arr, fn, flag){
	 var m = +Infinity;
	 if(flag)m = -Infinity;
	 var QUANTUM = 32768;
	 for(var i = 0; i < arr.length; i+=QUANTUM){
		 //arguments长度会有限制，针对太长的数组可以分片多次来取极值
		 var subm = fn.apply(null, arr.slice(i, Math.min(i+QUANTUM, arr.length)));
		 m = fn(subm, m);
	 }
	 return m;
 }
 function myEndOfArray(arr){
	 var max = -Infinity, min = +Infinity;
	 for(var i = 0; i < arr.length; i++){
		 if(max < arr[i])max = arr[i];
		 if(min > arr[i])min = arr[i];
	 }
	 console.log('Min:' + min, 'Max:' + max);
 }
 var nums = [];
 for(var i = 0; i < 100000; i++){
	 nums.push(Math.ceil(Math.random()*i+1));
 }
 myEndOfArray(nums);
 var min = endOfBigArray(nums, Math.min);
 var max = endOfBigArray(nums, Math.max, true);
 console.log('Min:' + min, 'Max:' + max);