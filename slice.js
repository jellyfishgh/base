var Buffer = require('buffer').Buffer;

var arr = ['a', 'b', 'c', '1', '2', '3'];

var str = 'abc123';

var buffer = new Buffer('abc123', 'utf-8');

var arr1 = arr.slice(2, 4);
print(arr, arr1);
arr1[0] = 'x';
print(arr, arr1);
arr[0] = 'y';
print(arr, arr1);

// Array slice 返回一个新数组，不会改变原来的数组，不共享原来数组的内存

console.log('######');

var str1 = str.slice(2, 4);
print(str, str1);
str1[0] = 'x';
print(str, str1);
str[0] = 'y';
print(str, str1);

// String slice 返回一个新字符串，不会改变原来的字符串，字符串不会发生变化

console.log('######');

var buffer1 = buffer.slice(2, 4);
print(buffer, buffer1);
buffer1[0] = new Buffer('x', 'utf-8')[0];
print(buffer, buffer1);
buffer[0] = new Buffer('y', 'utf-8')[0];
print(buffer, buffer1);

// Buffer slice 返回一个新buffer， 不会改变原来的buffer,共享原来数组的内存(任何一个发生了变化都会影响其他的)

function print(a, b){
    console.log("---");
    console.log(a.toString());
    console.log(b.toString());
}