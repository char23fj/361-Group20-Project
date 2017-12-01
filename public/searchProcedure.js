var searchBtn = document.getElementById('btn');

document.addEventListener("DOMContentLoaded", function(){
    showProcedures();
    searchBtn.addEventListener("click", performSearch);
});


function showProcedures(){
	var req = new XMLHttpRequest();
	req.open('GET', '/populateSearchPage', true);
	req.send();
		
    req.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    var arr = JSON.parse(this.responseText);
        var myData = [];
            for (var procedure of arr){
                for (var key in procedure){
                    var attrValue = procedure[key];
                    
                    if(key == 'name'){
                        var a = document.createElement("OPTION");
                                            a.setAttribute("value", attrValue);
		                            a.setAttribute("name",attrValue);
                                            var b = document.createTextNode(attrValue);
                                            a.appendChild(b);
		                            document.getElementById("txtbox1").appendChild(a);    
                    }else{
                       myData.push(procedure[key].toString()); 
                    }  
            }
        }	
        //filter out duplicates from dropdown
        myData = myData.filter( function( value, index, array ) { return array.indexOf(item) == index;});
        $("#txtbox2").autocomplete({source: myData});
		}
    }
};

function performSearch(){
    console.log("search initiated")
    var proc = document.getElementById('txtbox1');
    var req = new XMLHttpRequest();
    req.open('GET', '/showprices?name=' + proc.value, true);
    req.send();
		
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            var display = document.getElementById('resultdiv');
            display.textContent = this.responseText;
        }
    };
}

