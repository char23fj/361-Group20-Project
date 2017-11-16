/* 
 * 
 */

var fName = document.getElementById("firstNameEntry");
var lName = document.getElementById("lastNameEntry");
var email = document.getElementById("emailEntry");
var address = document.getElementById("addressEntry");
var zip = document.getElementById("zipEntry");
var state = document.getElementById("stateEntry");
var userField = document.getElementById("idBar");
var passField = document.getElementById("pwBar1");
var passConfirm = document.getElementById("pwBar2");
var loginButton = document.getElementById("submitBtn");
var entryDiv = document.getElementById("entries");

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

  //This will require a function that queries the DB for COUNT() where (userName = <userId>)
  if (dataBaseSearch(user, "userId"))
  {
    error += "That user ID is already in use.\n";
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
    var reqBody = {
      firstName: fName.value,
      lastName: lName.value,
      email: email.value,
      homeAddress: address.value,
      zipCode: zip.value,
      homeState: state.value,
      userId: userField.value,
      password: passField.value
    };
    
    //Post request to the 
    var req = new XMLHttpRequest();

    req.open('POST', '/addUser', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(event){
      if(req.status >= 200 && req.status < 400)
      {
        console.log(JSON.parse(req.responseText));
      }
      else
      {
        console.log('Error in network request: ' + req.statusText);
      }
    });
    req.send(JSON.stringify(reqBody));
  }
  event.preventDefault();
};

function enableOrDisableLB()
{
  if (fName.value == "" || lName.value == "" || address.value == "" || zip.value == "" ||
  state.value == "" || userField.value == "" || passField.value == "" || passConfirm.value == "")
  {
    loginButton.disabled = true;
  }

  else
  {
    loginButton.disabled = false;
  }
}