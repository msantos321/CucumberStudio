const assert = require('assert');
const AssertionError = require('assert').AssertionError;
//const { Before, Given, When, Then, By, until } = require ('cucumber');
const { Before, Given, When, Then} = require ('cucumber');
const Calculator = require('../../lib/calculator');

//const { By, until } = require('selenium-webdriver');

let calculator;

module.exports = function () {

//1 Step: Given the numbers 1 and 3
this.Given(/^the numbers (\d+) and (\d+)$/, function (x, y) {
         // Write code here that turns the phrase above into concrete actions
		 calculator = new Calculator(x, y);
		 console.log("++++Passed 2 args (num1, num2): Starts: ++++: ");
		 //callback(null, 'pending');
		 //callback();
		 
       });

//2 Step: Given the numbers 1 and 3
	     //this.When(/^they are added together$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         //callback(null, 'pending');
		 this.When(/^they are added together$/, function () {
		 calculator.add();
		 console.log("++++Call class: Starts: ++++: ");
       });
	   
//3 Step: Then should the result be 4
       //this.Then(/^should the result be (\d+)$/, function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
		 this.Then(/^should the result be (\d+)$/, function (expected, message='null') {
         //callback(null, 'pending');
		 //assert.equal(calculator.getResult(), expected)
		 assert(calculator.getResult(), expected);
		 console.log("++++Assertion: Starts: ++++: ");
       });
}   