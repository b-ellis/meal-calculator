// Diner objects

var diner = function(name) {
	this.name = name;
	this.dishes = [];
}

diner.prototype.addMeal = function addMeal(name, price) {
	this.dishes.push({
		name: name,
		price: price,
	});
}

diner.prototype.tipRate = function tipRate(tipRate) {
	var tip = tipRate/100;
	return tip;
}

diner.prototype.taxRate = function taxRate(taxRate) {
	var tax = taxRate/100 || 0;
	return tax;
}

diner.prototype.dinerTip = function dinerTip(tipRate) {
	var tip = this.DishCost() * this.tipRate(tipRate);
	return tip;
}

diner.prototype.dinerTax = function dinerTax(taxRate) {
	var tax = this.DishCost() * this.taxRate(taxRate);
	return tax;
}

diner.prototype.DishCost = function DishCost() {
	console.log(this.dishes);
	return this.dishes.reduce(function sum(sum, dishes) {
		return sum += dishes.price;
	}, 0);
}

diner.prototype.totalDishCost = function totalDishCost(taxRate, tipRate) {
	return (this.DishCost() + this.dinerTax(taxRate) + this.tipRate(tipRate));
}

diner.prototype.individual = function individual(taxRate, tipRate) {
	console.log("Diner: " + this.name + " owes $" + this.totalDishCost(taxRate, tipRate));
}

// Entire bill object

var bill = function(diner) {
	this.diners = [];
}

bill.prototype.addDiner = function addDiner(diner) {
	if (diner) {
		this.diners.push(diner);
	}
}

bill.prototype.getTotalMealCost = function getTotalMealCost() {
  	this.diners.forEach(function(diner) {
  		return diner.dishes.reduce(function (sum, dishes) {
  			var amount = dishes.price;
  			return sum+= amount;
  		}, 0);
  	});
};


// Example
var Brad = new diner("Brad");
Brad.addMeal("chicken pot pie", 10.00);
Brad.addMeal("Nachos", 5.00);
// Brad.individual(9.25, 20);

var Caroline = new diner("Caroline");
Caroline.addMeal("Pot Sticker", 5.25);
Caroline.addMeal("Ceasar Salad", 8.00);
// Caroline.individual(9.25, 20);

var Denver = new diner("Denver");
Denver.addMeal("Grilled Chicken and Potatoes", 10.50);
Denver.addMeal("Steak, Peas, Carotes", 20.75);
Denver.addMeal("Blueberry Pie", 5.00);
// Denver.individual(9.25, 20);


var tableOne = new bill;
tableOne.addDiner(Brad);
tableOne.addDiner(Caroline);
tableOne.addDiner(Denver);
console.log(tableOne);
console.log(tableOne.getTotalMealCost());
// console.log(tableOne.diners[1].dishes[1].price);


