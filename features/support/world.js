const webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
//var chrome = require('selenium-webdriver/chrome');

function CustomWorld() {
	this.driver = new webdriver.Builder().forBrowser('firefox').build();
}

module.exports = function() {
  this.World = CustomWorld;
  this.setDefaultTimeout(30 * 1000);
};
