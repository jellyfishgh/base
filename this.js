function modulus(){
	return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im , 2));
}
var o = {
	re: 1,//实部
	im: -1,//虚部
	get phase(){
		return Math.atan2(this.re, this.im);
	}
}
Object.defineProperty(o, 'modulus', {
	get: modulus,
	configurable: true,
	enumerable: true
})

console.log(o);
console.log(o.phase, o.modulus);