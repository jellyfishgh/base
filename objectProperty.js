/*
	属性的configurable,writable,enumerable都为true
*/
var o1 = {
	name:'HeMu',
	location: ['GuangZhou', 'ChangSha'],
	sayHi: function(){
		console.log('sayHi->' + this.name + ': ' + this.location);
	}
}
console.log(o1);
o1.sayHi();
console.log(o1.propertyIsEnumerable('name'));
console.log(Object.keys(o1));