/* 
 * 
 */

var oldUsername = document.getElementById("tbox1");
var newUsername = document.getElementById("tbox2");
var oldPassword = document.getElementById("tbox3");
var newPassword = document.getElementById("tbox4");
var submitButton = document.getElementById("btn");

document.addEventListener("DOMContentLoaded", function(){
  loginButton.disabled = true;
  loginButton.addEventListener("click", submission);
  entryDiv.addEventListener("input", enableOrDisableLB);
});

//Submit new values for user changing account details
function submission(event)
{
  var user = oldUsername.value;
  
  //This will require a div above or below the login fields for entry errors
  var error = document.getElementById("invalidDiv").textContent = "";

  if (!dataBaseSearch(user, "userId"))
  {
    error += "Sorry that username does not exist.\n";
  }

  if (oldPassword.value !== dataBaseSearch(user,"password"))
  {
    error += "The password you entered doesn't match your account.\n";
  }
  
  if (newPassword.value.length > 8)
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
