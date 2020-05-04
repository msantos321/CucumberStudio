const assert = require('assert');
const AssertionError = require('assert').AssertionError;
const { Before, Given, When, Then} = require ('cucumber');
const { By, until, wait } = require('selenium-webdriver');
const Logme = require('../../lib/logme');
//import { createBasicContact } from "../../lib/contactData";
//const createBasicContact = require('../../lib/contactData');


//const { By, until } = require('selenium-webdriver');

let logme;


module.exports = function () {

//1 Step: Given the numbers 1 and 3
//this.Given(/^the numbers (\d+) and (\d+)$/, function (x, y) {
	this.Given(/^the user navigates to "([^"]*)"$/, function (url) {
         // Write code here that turns the phrase above into concrete actions
		 console.log("++++Recevied 1 arg (dms url): Starts: ++++: ");
		 return this.driver.get(url);	 
		 
       });

//2 Step: Given the numbers 1 and 3
	     //this.When(/^they are added together$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         //callback(null, 'pending');
		 //this.When(/^they are added together$/, function () {
		this.When(/^on the login form the user enters "([^"]*)" email and "([^"]*)" password$/, function (usr, pwd) {
         // Write code here that turns the phrase above into concrete actions
		 console.log("++++Passed usr: Starts: ++++: " + usr);
		 if (usr != "") {
			this.driver.wait(until.elementLocated({xpath: ".//input[@class='inputField textStyles']"}), 5000).then(element => element.sendKeys(usr));
		
			 if (pwd != "") {
				 console.log("++++Passed pwd!!!: Starts: ++++: " + pwd);
				 return this.driver.wait(until.elementLocated({xpath: ".//input[@class='inputField textStyles password']"}), 8000).then(element => element.sendKeys(pwd));
			 }
			 
		 }
       });
//3 Step

	this.When(/^on the login form the user submits the login form$/, function () {
         // Write code here that turns the phrase above into concrete actions
         //callback(null, 'pending');
		 //email=logme.save();
		 //console.log("++++Call save: Rcd Email: ++++:" + email);
		 //this.driver.wait(until.elementLocated({xpath: ".//input[@class='inputField textStyles']"}), 5000).then(element => element.sendKeys(email));
		 console.log("++++Save Button!!!: Starts: ++++: ");
		return this.driver.wait(until.elementLocated({xpath: ".//button[@class='theme_primary']"}), 5000).then(element => element.click());
	});
	
//4  Step: Then should the result be 4
       //this.Then(/^should the result be (\d+)$/, function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions 
		 this.Then(/^the user lands on the dms dashboard and sees "([^"]*)" in the header$/, function (expected) {
		 //rtn = logme.getResult()
		 //logme = new Logme(expected);
		 //res = logme.getResult();
		 console.log("++++Locate: DMS QA icon: ++++");
		 element = this.driver.wait(until.elementLocated({xpath: "//h6[contains(text(),'DMS QA')]"}), 10000)
		 var txt = element;
		 //.then(element => element.value());
		 //return this.driver.wait(until.titleIs(pageTitle), 10000);
		 //return this.driver.wait(until.titleIs(expected), 10000);
		 //assert.equal(logme.getResult(), expected);
		 //browser.assert.equal(result.value,'text')
		 //this.assert.equal(resuddlt.value, "your value");
		 //return this.driver.wait(until.titleIs(pageTitle), 10000);
		 console.log("++++Assert DMS QA DB ?: ++++" + txt);
		 //assert( expected === "DMS QA", 'DMS QA DB');
		 //this.assert.equal(expected, "DMS QA");
		 
       });
//5 Step: And the user logs out
	this.Then(/^the user logs out$/, function () {
		logme = new Logme();
		console.log("++++Calling LogOut: ++++");
		logme.logOut();;
		//clickMenuButton("Avatar", "Log Out");
		////a[@href='/Logout']
		////*[@id='menu-appbar']//ul//a[1]
		//this.driver.wait(until.elementLocated({xpath: "//header//button[@aria-label='Open Avatar Menu']"}), 5000).then(element => element.click());
		//return this.driver.wait(until.elementLocated({xpath: "//a[@href='/Logout']"}), 5000).then(element => element.click());
	});
}   