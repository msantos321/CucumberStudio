const { By, until } = require('selenium-webdriver');

/*

CONDUCTING A SEARCH ON A FILTER THAT DOESN'T EXIST AS A COLUMN IN THE TABLE IS AN INVALID TEST CASE.
ALL SEARCHES SHOULD CONTAIN THE FILTER AS A COLUMN IN THE TABLE IN ORDER TO VERIFY RESULTS IN THE UI.

datatype : inner cell xpath
  text : td > div > text
  link : td > div > a > text
  image : tx > div > img
  bit : td > div > svg

    true:
    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>

    false : 
    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>

filter types :
  textbox
  single select
  multi select
  date

*/

module.exports = function () {
  //*******************************************************************************************************************************************
  //*** Top Level Buttons **************************************************************************************************************************
  //*******************************************************************************************************************************************

  //Button - Click
  this.When(/^on the grid the user clicks the \"(.*?)\" button$/, { timeout: 10000 }, function(button_identifier){
    return this.driver.wait(until.elementLocated({xpath: "//button/span[text()='" + button_identifier + "']"}), 10000).then(element => element.click());
  });

  //*******************************************************************************************************************************************
  //*** Filters *******************************************************************************************************************************
  //*******************************************************************************************************************************************

  //Filter - Primary - Click
  this.When(/^on the grid the user clicks on the \"(.*?)\" primary text field filter$/, function(filter_name) {
    return this.driver.wait(until.elementLocated({xpath: "//div[@class='filterRow']/span/div/span[text()='" + filter_name + "']"}), 7000).then(element => element.click());
  });
  
  //Filter - Primary - Text Box - Type
  this.When(/^on the grid the user types \"(.*?)\" in \"(.*?)\" primary text field filter$/, function(search_string,filter_name) {
    return this.driver.wait(until.elementLocated({xpath: "//div[@class='inputRow']/div/div/input"}), 7000).then(element => element.sendKeys(search_string));
  });
  
  //Filter - Button - Click
  this.When(/^on the grid filter the user clicks the \"(.*?)\" button$/, function(button_identifier) {
    return this.driver.wait(until.elementLocated({xpath: "//button/span[text()='" + button_identifier + "']"}), 7000).then(element => element.click());
  });

  //*******************************************************************************************************************************************
  //*** Page Size & Pagination ****************************************************************************************************************
  //*******************************************************************************************************************************************

  //Page Size
  //needs content

  //Pagination
  //needs content

  //*******************************************************************************************************************************************
  //*** DataView Table ************************************************************************************************************************
  //*******************************************************************************************************************************************

  //DataView - Column Data Matches Filter Value - Verify
  this.Then(/^on the grid the user sees records returned with \"(.*?)\" in the \"(.*?)\" column as \"(.*?)\"$/, function(search_string,filter_name,column_datatype) {
    //this checks that the h1 on the mosaic grid matches whatever is passed
    //return this.driver.wait(until.elementLocated({xpath: "//main/div/div/div/div/div/h1[text()='" + filter_name + "']"}), 5000).then(element => element.click());
      
    //in chrome console this returns the index of the table column that matches the column name passed in the scenario step (when entered into chrome console as : $x("enter_xpath")) - keeping this here just to demonstrate that it worked on chrome console
    //count(//div[normalize-space(@class) = 'viewContainer']/table/thead/tr/th/span[text()='Account']/parent::th/preceding-sibling::*)+1
    
    //this is an example of how one might write output to the console (cmd not browser console)
    //this.driver.findElements(By.className('label')).then(found => console.log('Element found? %s', !!found.length));
    //console.log('Debug Info : %s', !!search_string)
    
    var xTHColumnIndex = 0; //declare variable and set default val
    var driver = this.driver; //this is necessary when using function instead of => because js changes the scope of 'this' when using function
    //find the column index of the filter
    return driver.wait(until.elementsLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/thead/tr/th/span[text()='"+ filter_name +"']/parent::th/preceding-sibling::*"}), 5000).then(
      function (element){
        //set var to column index+1
        xTHColumnIndex = element.length+1;
        //check the column for the search_string - this is the return used in the 'text' conditional below without going through the if statement
        //return driver.wait(until.elementsLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr/td["+ xTHColumnIndex +"]/div[text()='" + search_string + "']"}), 5000);

        if(column_datatype == 'text'){
          return driver.wait(until.elementsLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr/td["+ xTHColumnIndex +"]/div[text()='" + search_string + "']"}), 5000);
        }
        else if(column_datatype == 'link'){
          return driver.wait(until.elementsLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr/td["+ xTHColumnIndex +"]/div/a[text()='" + search_string + "']"}), 5000);
        }
        else if(column_datatype == 'bit'){
          var svg_identifier = 0;
          if(search_string === 'true'){svg_identifier = "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z";}
          if(search_string === 'false'){svg_identifier = "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";}
          return driver.wait(until.elementsLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr/td["+ xTHColumnIndex +"]/div/svg/path[@d='" + svg_identifier + "']"}), 5000);
        }

      }
    );
  });

  //Dataview - No results were found
  this.When(/^on the grid the \"(.*?)\" message displays$/, { timeout: 90000 }, function(no_results_message){
    return this.driver.wait(until.elementLocated({xpath: "//div[@class='noResults']/p[text()='" + no_results_message + "']"}), 10000);
  });

  //Dataview - First Row - Pencil Icon - Click
  this.When(/^on the grid the user clicks the pencil icon on the first row to open the edit form$/, { timeout: 90000 }, function(){
    return this.driver.wait(until.elementLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr[1]/td[1]/div/span/span[1]/button"}), 7000).then(element => element.click());
  });

  //Dataview - First Row - Clone Icon - Click
  this.When(/^on the grid the user clicks the clone icon on the first row to open the cloned form$/, { timeout: 90000 }, function(){
    return this.driver.wait(until.elementLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr[1]/td[1]/div/span/span[2]/button"}), 7000).then(element => element.click());
  });

  //Dataview - First Row - Trash Icon - Click
  this.When(/^on the grid the user clicks the trash icon on the first row to delete the record$/, { timeout: 90000 }, function(){
    return this.driver.wait(until.elementLocated({xpath: "//div[normalize-space(@class) = 'viewContainer']/table/tbody/tr[1]/td[1]/div/span/span[3]/button"}), 10000).then(element => element.click());
  });
  
};


