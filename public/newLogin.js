
var fName = document.getElementById("firstNameEntry");
var lName = document.getElementById("lastNameEntry");
var email = document.getElementById("emailEntry");
var zip = document.getElementById("zipEntry");
var passField = document.getElementById("pwBar1");
var passConfirm = document.getElementById("pwBar2");
var registerButton = document.getElementById("submitBtn");
var entryDiv = document.getElementById("entries");
var userName = document.getElementById("userName");


document.addEventListener("DOMContentLoaded", function(){
  registerButton.disabled = true;
  registerButton.addEventListener("click", submission);
  document.getElementById("entryDiv").addEventListener("input", enableOrDisableLB);
});

//When register button clicked submits values to database to add user to siteUser table.  
function submission(event)
{
  //This will require a div above or below the login fields for entry errors
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
      'fname': fName.value,
      'lname': lName.value,
      'email': email.value,
      'zip': zip.value,
      'userId': userName.value,
      'password': passField.value
    };
    
    //Post request to the 
    var req = new XMLHttpRequest();
    //var change = 0;
    //console.log("0");
    req.open('POST', '/addUser', true);
    //console.log("1");
    req.setRequestHeader('Content-Type', 'application/json');
    //console.log("2");
    req.addEventListener('load', function(event){
      if(req.status >= 200 && req.status < 400)
      {
        console.log(req.responseText);
        console.log("query fired!");
        //change = req.responseText;
        document.getElementById("showUser").style.display = "block";
        document.getElementById("outerEntry").style.display = "none";
        document.getElementById("showName").textContent = "Welcome, "
        + req.responseText + "!";
      }
      else
      {
        console.log('Error in network request: ' + req.statusText);
      }
    });
    reqBody = JSON.stringify(reqBody);
    req.send(reqBody);
  }
  event.preventDefault();
};

//disables register button if any of the input fields are not filled in.  
function enableOrDisableLB()
{
  if (fName.value == "" || lName.value == "" || zip.value == "" || email.value == ""
     || userName.value == "" || passField.value == "" || passConfirm.value == "")
  {
    registerButton.disabled = true;
  }
  
  if (fName.value == "test")
  {
    fName.value += "01";
    lName.value = lName.textContent = "user";
    zip.value = zip.textContent = "55555";
    email.value = "none@mail.com"
    userName.value = userName.textContent = "testuser";
    passField.value = passField.textContent = "rutabaga";
    passConfirm.value = passConfirm.textContent = "rutabaga";
    var errorBox = document.getElementById("invalidDiv");
    errorBox.textContent += "testuser's password is 'rutabaga'.\n";
    registerButton.disabled = false;
  }
  
  else
  {
    registerButton.disabled = false;
  }
}
