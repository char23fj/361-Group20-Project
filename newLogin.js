/* 
 * 
 */

var fName = document.getElementById("firstNameEntry");
var lName = document.getElementById("lastNameEntry");
var location = document.getElementById("locationEntry");
var entryDiv = document.getElementById("entries");
var userField = document.getElementById("idBar");
var passField = document.getElementById("pwBar1");
var passConfirm = document.getElementById("pwBar2");
var loginButton = document.getElementById("submitBtn");

document.addEventListener("DOMContentLoaded", function(){
  loginButton.disabled = true;
  loginButton.addEventListener("click", submission);
  entryDiv.addEventListener("input", enableOrDisableLB);
});

function submission(event)
{
  var user = userField.value;
  
  //This will require a div above or below the login fields for entry errors
  var error = document.getElementById("invalidDiv").textContent = "";

  if (dataBaseSearch(user, "userId"))
  {
    error += "That email address is already in use.\n";
  }

  if (passConfirm.value !== passField.value)
  {
    error += "The passwords you entered don't match.\n";
  }
  
  if (passField.value.length > 8)
  {
    error += "Your password doesn't meet the minimum length requirement.\n";
  }
  
  if (error == "")
  {
    var reqBody = 
    //This function call is just a placeholder until the queries are in place
    //(or it could be used as a caller for the relevant query)
    addToDatabase(reqBody);
  }
  
  event.preventDefault();
};

function enableOrDisableLB()
{
  if (fName.value == "" || lName.value == "" || location.value == ""
  || userField.value == "" || passField.value == "" || passConfirm.value == "")
  {
    loginButton.disabled = true;
  }

  else
  {
    loginButton.disabled = false;
  }
}