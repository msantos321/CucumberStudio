const { By, until } = require('selenium-webdriver');

module.exports = function () {

    //this is a hokey temporary workaround added because after interacting with the delete prompt the elements can't be clicked
    this.Then(/the user refreshes the browser$/, { implicit: 90000 }, function() {
        return this.driver.navigate().refresh();
    });

    //*******************************************************************************************************************************************
    //*** Left Nav ******************************************************************************************************************************
    //*******************************************************************************************************************************************
    
    //Left Nav - Top Level Nav Item - Click
    this.When(/^the user clicks \"(.*?)\" in the left nav$/, { timeout: 90000 }, function(left_nav_item){
        //If the left nav is open
        if (this.driver.wait(until.elementLocated({xpath: "//div[contains(@class,' leftNavOpen ')]/ul/a/div[2]/span[contains(string(), '" + left_nav_item + "')]"}), 7000)){
            //console.log('dms_account.js - left nav - top level item - click - open');
            return this.driver.wait(until.elementLocated({xpath: "//div[contains(@class,' leftNavOpen ')]/ul/a/div[2]/span[contains(string(), '" + left_nav_item + "')]"}), 7000).then(element => element.click());
        }
        //Else if the nav is closed
        else{
            //console.log('dms_account.js - left nav - top level item - click - closed');
            return this.driver.wait(until.elementLocated({xpath: "//div[contains(@class,' leftNavClosed ')]/ul/a/div[2]/span[contains(string(), '" + left_nav_item + "')]"}), 7000).then(element => element.click());
        }
    });

    //*******************************************************************************************************************************************
    //*** Snackbar ******************************************************************************************************************************
    //*******************************************************************************************************************************************

    //Snackbar with Link - Click
    this.Then(/^the snackbar with link displays and the user clicks the snackbar link$/, { implicit: 90000 }, function() {
        return this.driver.wait(until.elementLocated({xpath: "//div[@class='MuiSnackbarContent-message']/div/p/a"}), 10000).then(element => element.click());
    });

    //******************************************************************************************************************************************
    //*** Dialogues *****************************************************************************************************************************
    //*******************************************************************************************************************************************

    //Dialogue - OK - Click
    this.Then(/^the \"(.*?)\" dialogue box appears and the user clicks OK$/, { timeout: 90000 }, function(dialogue_title) {
        return this.driver.wait(until.elementLocated({xpath: "//div[@aria-describedby='alert-dialog-description']/div[3]/button/span[text()='OK']"}), 10000).then(element => element.click());
    });
 
};