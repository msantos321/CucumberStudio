@regression @login @app @dashboard
Feature: User logs into DMS

Scenario: User logs into DMS
  Given the user navigates to "https://qa.qa.simpleviewdms.com"
  When on the login form the user enters "msantos+crmu.002@simpleviewinc.com" email and "dmsAuth1234" password
  And on the login form the user submits the login form
  Then the user lands on the dms dashboard and sees "Simpleview Inc" in the header
  And the user logs out