const { By, until } = require('selenium-webdriver');

module.exports = function () {
  //*******************************************************************************************************************************************
  //*** SUMMARY *******************************************************************************************************************************
  //*******************************************************************************************************************************************

  //H6 (record title) - Verify
  this.Then(/^on the summary \"(.*?)\" displays as the h6 in the mini panel$/, { timeout: 90000 }, function(record_name){
    return this.driver.wait(until.elementLocated({xpath: "//h6[text()='" + record_name + "']"}), 5000);
  });

  //Pencil Icon (Edit) - Click
  this.Then(/^on the summary the edit icon is clicked to open the form$/, function() {
      return this.driver.wait(until.elementLocated({xpath: "//div[contains(@class,'MuiCardActions-root')]/button[1]"}), 7000).then(element => element.click());
  }); 

  //Multi-Select Chip Editor - Verify
  this.Then(/^on the summary \"(.*?)\" has \"(.*?)\" selected$/, { timeout: 90000 }, function(field_identifier,field_value){
    //because elements aren't consistently named we have to do this hokey var update
    //if (field_identifier == "Groups"){
      //field_identifier = "Assigned Groups";
    //}
    return this.driver.wait(until.elementLocated({xpath: "//div[@class='detail-summary-fieldset']/span[text()='" + field_identifier + "']/following-sibling::p/span/span[text()='" + field_value + "']"}), 5000);
  });

};