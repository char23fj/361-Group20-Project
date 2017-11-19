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
