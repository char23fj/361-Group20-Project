/* 
 * 
 */

var fName = document.getElementById("firstNameEntry");
var lName = document.getElementById("lastNameEntry");
var email = document.getElementById("emailEntry");
var address = document.getElementById("addressEntry");
var zip = document.getElementById("zipEntry");
var state = document.getElementById("stateEntry");
var passField = document.getElementById("pwBar1");
var passConfirm = document.getElementById("pwBar2");
var registerButton = document.getElementById("submitBtn");
var entryDiv = document.getElementById("entries");
var userName = document.getElementById("userName");


document.addEventListener("DOMContentLoaded", function(){
  registerButton.disabled = true;
  registerButton.addEventListener("click", submission);
  document.getElementById("entryDiv").addEventListener("input", enableOrDisableLB);
  console.log("fired");
});

function submission(event)
{
  
  //This will require a div above or below the login fields for entry errors
  var error = document.getElementById("invalidDiv").textContent = "";

  //This will require a function that queries the DB for COUNT() where (userName = <userId>)
  /*if (dataBaseSearch(user, "userId"))
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
  }*/
  
  if (error == "")
  {
    var reqBody = {
      firstNameEntry: fName.value,
      lastNameEntry: lName.value,
      emailEntry: email.value,
      addressEntry: address.value,
      zipEntry: zip.value,
      stateEntry: state.value,
      userName: userName.value,
      pwBar1: passField.value
    };
    
    //Post request to the 
    var req = new XMLHttpRequest();

    req.open('POST', '/addUser', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(event){
      if(req.status >= 200 && req.status < 400)
      {
        //console.log(JSON.parse(req.responseText));
        console.log("query fired!");
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
  state.value == "" || passField.value == "" || passConfirm.value == "")
  {
    registerButton.disabled = true;
  }
  else
  {
    registerButton.disabled = false;
  }
}
