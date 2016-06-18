var obj = {};

Object.defineProperty(obj, 'a', {
	value : ['A', 'B'],
	writable : false
});
Object.defineProperty(obj, 'b', {
	value : 'XY',
	writable : false
});
Object.defineProperties(obj, {
	c : {
		value : 'C',
		writable : false,
		enumerable : false,
		configurable : false
	},
	d : {
		value : 'D',
		writable : true,
		enumerable : true,
		configurable : true
	}
});

console.log(obj.a);
obj.a.push('C');
console.log(obj.a);
obj.a = ['M', 'N'];
console.log(obj.a);

console.log(obj.b);
obj.b = 'PQ';
console.log(obj.b);

obj.e = 'E';
console.log(Object.keys(obj));
console.log(obj.propertyIsEnumerable('a'));
for(var key in obj){
	console.log(key + '->' + obj[key]);
}

/*
	对于已经存在的属性，仅仅是modify该属性：保持已有的不变，改变对象里的新的值
	对于obj.e:只是改变value:E->EE,原来的configurable,writable,enumerable仍然为原来的值(true)
*/
Object.defineProperty(obj, 'e', {
	value : 'EE'
});
console.log(obj.e);
console.log(obj.propertyIsEnumerable('e'));
console.log(Object.keys(obj));

/*
	obj.c:
		configurable:false =>
		obj.c 不能 redefine
		throw error
 */ 
//  Object.defineProperty(obj, 'c', {
// 	enumerable : true 
//  });
//  console.log(obj.propertyIsEnumerable('c'));

/*
The configurable attribute controls at the same time whether the property can be deleted from the object and 
whether its attributes (other than writable) can be changed

看看什么情况下configurable为false时可以更改writable??

写一篇博客：穷尽freeze,seal,preventExtensions与(Object.defineProperty,writable, enumerable,configurable)
*/