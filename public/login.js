/* 
 * 
 */

var userField = document.getElementById("idBar");
var passField = document.getElementById("pwBar");
var loginButton = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(event) {
  var user = userField.value;
  
  //These function calls are just placeholders until the queries are in place
  if (dataBaseSearch(user, "userId")
  && dataBaseSearch(user, passField.value, "password"))
  {
    //Render next page
  }

  else
  {
    //This will require a div above or below the login fields for this error
    document.getElementById("invalidDiv").textContent = 
    "The username or password you entered is invalid.";
  }
  
  event.preventDefault();
});