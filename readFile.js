var fs = require('fs');
var iconv = require('iconv-lite');//gbk->utf8,第三方包:C:\Users\admin\node_modules\iconv-lite

/*
BOM用于标记一个文本文件使用Unicode编码，
其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。

Bytes      Encoding
--------------------
FE FF       UTF16BE
FF FE       UTF16LE
EF BB BF    UTF8
*/

//读取utf-8文件时，去掉BOM
function readText(pathname){
	var bin = fs.readFileSync(pathname);
	if(bin[0]===0xEF && bin[1]===0xBB && bin[2]===0xBF){
		bin = bin.slice(3);
	}
	return bin.toString('utf-8');
}

function readGBKText(pathname){
	var bin = fs.readFileSync(pathname);
	return iconv.decode(bin, 'gbk');
}

var gbkText = readGBKText('test/hello.txt');//GBK->UTF-8
console.log(gbkText);

/*
	对于 ASCII 0~128 的字符，无论是很么编码，单字节读取时都一样
 */
function replaceCopy(src,dst){
	var str = fs.readFileSync(src, 'binary');//单字节读取文件
	str = str.replace('hello', 'hahaha');
	fs.writeFileSync(dst, str, 'binary');
}

replaceCopy('test/hello.txt', 'test/test.txt');