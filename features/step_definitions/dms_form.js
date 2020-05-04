const { By, until } = require('selenium-webdriver');

module.exports = function () {
  //*******************************************************************************************************************************************
  //*** Text Field ****************************************************************************************************************************
  //*******************************************************************************************************************************************

  //Form - Text Field - Set Value
  this.When(/^on the form the text field \"(.*?)\" the value \"(.*?)\" is entered$/, function(field_identifier,field_value){
    return this.driver.wait(until.elementLocated({xpath: "//div[@data-cy='" + field_identifier + "']/div/div/input"}), 5000).then(element => element.sendKeys(field_value));
  });

  //Form - Text Field - Verify Value
  this.Then(/^on the form the text field \"(.*?)\" the value \"(.*?)\" is verified$/, function(field_identifier,field_value){
	  return this.driver.wait(until.elementLocated({xpath: "//div[@data-cy='" + field_identifier + "']/div/div/input[@value='" + field_value + "']"}), 5000);
  });

  //*******************************************************************************************************************************************
  //*** Textarea Field ************************************************************************************************************************
  //*******************************************************************************************************************************************

  //Form - Textarea Field - Set Value
  this.When(/^on the form the textarea field \"(.*?)\" the value \"(.*?)\" is entered$/, function(field_identifier,field_value){
    return this.driver.wait(until.elementLocated({xpath: "//div[@data-cy='" + field_identifier + "']/div/div/textarea"}), 5000).then(element => element.sendKeys(field_value));
  });

  //Form - Textarea Field - Verify Value
  this.Then(/^on the form the textarea field \"(.*?)\" the value \"(.*?)\" is verified$/, function(field_identifier,field_value){
    return this.driver.wait(until.elementLocated({xpath: "//div[@data-cy='" + field_identifier + "']/div/div/textarea[@value='" + field_identifier + "']"}), 5000);
  });

  //*******************************************************************************************************************************************
  //*** Multi-Select Chip-Editor Field ********************************************************************************************************
  //*******************************************************************************************************************************************

  //Form - Multi-Select Chip-Editor - Click Field To Open Options Dropdown then Select Item
  this.When(/^on the form the multi-select chip-editor field \"(.*?)\" the value \"(.*?)\" is selected$/, function(field_identifier,field_value){
    var returnGroup;
    returnGroup = this.driver.wait(until.elementLocated({xpath: "//div[@id='" + field_identifier + "']/div"}), 5000).then(element => element.click());
    returnGroup = this.driver.wait(until.elementLocated({xpath: "//div[@data-cy='" + field_identifier + "']/div/div/div[2]/div/div[contains(string(), '" + field_value + "')]"}), 5000).then(element => element.click());
    return returnGroup;
  });

  //Account Form - Groups - Verify (issue with this being completely obfuscated is that the field title is "Assigned Groups" but field identifier is simply "Groups" - need to come up with way to write out in plain english for feature)
  this.Then(/^on the form the multi-select chip-editor field \"(.*?)\" the value \"(.*?)\" is verified$/, function(field_identifier,field_value){
	  return this.driver.wait(until.elementLocated({xpath: "//div[@data-cy='" + field_identifier + "']/div/div[2]/div[@data-cy='" + field_value + "']"}), 5000);
  });

  //*******************************************************************************************************************************************
  //*** Buttons *******************************************************************************************************************************
  //*******************************************************************************************************************************************

  //Submit Button - Click
  this.When(/^on the form the submit button with the \"(.*?)\" label is clicked$/, function(button_text) {
    return this.driver.wait(until.elementLocated({xpath: "//button[@type='submit']/span[text()='" + button_text + "']"}), 5000).then(element => element.click());
  });

};