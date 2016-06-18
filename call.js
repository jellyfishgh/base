function Product(name, price) {
	this.name = name;
	this.price = price;
	if(price < 0){
		throw RangeError("Cannot create product " + this.name + " with a negative price.");
	}
	return this;
}
function Food(name, price) {
	Product.call(this, name, price);
	this.category = 'food';
}

Food.prototype = Object.create(Product.prototype);
Food.prototype.constructor = Food;

function Toy(name, price){
	Product.call(this, name, price);
	this.category = 'toy';
}
Toy.prototype = Object.create(Product.prototype);
Toy.prototype.constructor = Toy;

var cheese = new Food('feta', 5);
console.log(cheese);
var fun = new Toy('fobot', 40);
console.log(fun);

var animals = [
	{species: 'Lion', name: 'King'},
	{species: 'Whale', name: 'Fail'}
];
for(var i = 0; i < animals.length; i++){
	(function(i){
		this.print = function(){
			console.log("#" + i + ' ' + this.species + ': ' + this.name);
		}
	}).call(animals[i], i);
}
animals[0].print();
console.log(animals[1]);