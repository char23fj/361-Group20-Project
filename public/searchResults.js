// JavaScript source code

document.addEventListener("DOMContentLoaded", function(){

    var count = document.getElementById("resultsTable").rows.length;
    
    if(count < 2){
        document.getElementById("errorDiv").innerHTML = "Sorry, There are no results that match your search";
    
    
    }

});



