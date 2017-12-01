# 361-Group20-Project

Feel free to place any important notes here.

11/16 (Charles):  I've updated the script files for the pages we've drafted.  I moved them to the public folder because that's the 
  designated "static" folder and if I remember right, they need to be there to execute.
  I also included basic xml http requests in two of the scripts.  May need modification.  Can someone draft request handlers/queries?
  Maybe before we do that, though, we should sort out the issue of what attributes the user will have.  Please see the issue
  I posted on that.

11/16 Erik and Phil set up and tested the ability to create a new user.  We removed the reference to login.js validation for now. the js validation was diabling the register button when all fields were filled. If someone wants to make it function that would be great.  The query inserts all the fields currently in the user table.  We can modify the write query easily depending on what columns we decide to keep. 

11/16 Charles, registering a new user now executes through the newLogin.js. I commented out some of the code that was not working because functions have not been implimented yet. 

11/17 (Charles):  I fixed the errors on newLogin.js and the register page has good client-side functionality.  Tested the error div and it gives proper errors for password matching and length.  If no errors, it executes the http request to the /addUser page (no response because we have to fill in that request handler).  Try it out!  It's pretty nice now.  I'll think about adding further validation for zip code (00000 - 99999) and email address (proper format).

Also, a note on the reqBody variable in newLogin.js:  I noticed someone changed the attributes to match the names I assigned to the form input fields.  They don't need to match up with those.  These are going to be fields that will be sent to the server to create the new user, so they should probably match up with the database fields once we make a firm decision on those.

11/19 (Phil): updated the login request to be a post request so username and password are not displayed in the url.  Added notification of account created on register page.  

11/24 (phil): edit account info page is now accessible after logging in and fills forms with user data. the button to update account info does not work yet.  user info is stored in session data for remembering who you are logged in as. Also I noticed there is a syntax error, probs a missing } or ), somewhere in newLogin.js from the last time it was edited so it is not working right now.  

11/25 (Charles): Added the missing parenthesis.  It was on the version that's currently running the site, but I hadn't updated this one.

11/28  (Charles):
1.  Fixed the show/hide actions and response text from server to display a welcome message for the user and a link to home after registering.
2.  I am pleased to report full functionality for new user registration and changing account details.  Note, however, that there are still some fields (address, state) in the registration form that are unused in the database and do not appear on the change details page.  I can remove those from the new user page later.

11/28 (Erik) Wrote SQL statement to create a "procedure" table in the database and a statement to fill it with data for use when testing the searching functionality of the application.


11/29 (phil) Made search page accessible from the home page. Added a dropdown box for the procedures.  Their values are the string name of the procedure so when we request a procedure we can pass that value to the request.  I think this is best for our prototype so that the grader does not have to guess on what procedures exist. 

11/30 (Charles):  Did some fine-tuning.  Also added a request and request handler to perform a search.  If I have more time later I'll look at the result page and how to populate it; I just have a display div showing the stringified result for now.

11/30 (Phil): added auto complete suggestion to zip code search box.  added sql statements to add zip column to table.  updated back to home buttons to display name of user on return. 

12/1 (Charles):  Edited search results page and changed request handler to render said page.  Notes from my edit on the view file:
"You guys can decide what you want to display, but I stuck with distance for the time being (I think that would be the ultimate result, although we currently have an arbitrary process of obtaining that number).  Note that the search query on main.js displays results where distance < 101, so tinker with that at will."
Also, if we want to do something with zip code, maybe list results within 1 on the second digit or something?  For example, if zip is 63031, list all from 62031 to 64031.  Maybe do a couple quick calculations above the query along the lines of:
var hi = req.query.zip + 1000;
var low = req.query.zip - 1000;
And then do the query "WHERE zip < ? && zip > ?", with added arguments hi and low.
