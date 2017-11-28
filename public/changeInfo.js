var fName = document.getElementById("firstNameEntry");
var lName = document.getElementById("lastNameEntry");
var email = document.getElementById("emailEntry");
var zip = document.getElementById("zipEntry");
var passField = document.getElementById("pwBar1");
var passConfirm = document.getElementById("pwBar2");
var submitButton = document.getElementById("btn");
var entryDiv = document.getElementById("editAccount");
var userName = document.getElementById("idBar");


document.addEventListener("DOMContentLoaded", function(){
  submitButton.addEventListener("click", submission);
  document.getElementById("entryDiv").addEventListener("input", enableOrDisableLB);
});

//When register button clicked submits values to database to add user to siteUser table.  
function submission(event)
{
  //Div below the login fields for entry errors
  var errorBox = document.getElementById("invalidDiv");
  errorBox.textContent = "";

  //This will require a function that queries the DB for COUNT() where (userName = <userId>)
  /*if (dataBaseSearch(user, "userId"))
  {
    errorBox.textContent += "That user ID is already in use.\n";
  }*/

  if (passConfirm.value !== passField.value)
  {
    errorBox.textContent += "The passwords you entered don't match.\n";
  }
  
  if (passField.value.length < 8)
  {
    errorBox.textContent += "Your password doesn't meet the minimum length requirement.\n"
    + "Please choose a password of at least 8 characters.\n";
  }
  
  if (errorBox.textContent == "")
  {
    var reqBody = {
      'userId': document.getElementById("userId").value,
      'fname': fName.value,
      'lname': lName.value,
      'email': email.value,
      'zip': zip.value,
      'userName': userName.value,
      'password': passField.value
    };
      
    var req = new XMLHttpRequest();

    req.open('POST', '/updateInfo', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(event){
      if(req.status >= 200 && req.status < 400)
      {
        console.log("information updated");
        errorBox.textContent = "Account updated successfully.";
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

//disables register button if any of the input fields are not filled in.  
function enableOrDisableLB()
{
  if (fName.value == "" || lName.value == "" || zip.value == "" || email.value == ""
  || userName.value == "" || passField.value == "" || passConfirm.value == "")
  {
    submitButton.disabled = true;
  }
  
  else
  {
    submitButton.disabled = false;
  }
}
