var array = [
	{
		name:"HeMu",
		age:22
	},
	{
		name:"Jellyfish",
		age:23
	}
];
var iterator1 = new Iterator(array);
var item;
while(item = iterator1.next()){
	console.log(item);
}