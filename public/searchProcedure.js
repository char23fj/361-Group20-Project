var searchBtn = document.getElementById('btn');
var zip = document.getElementById('txtBox2');
document.addEventListener("DOMContentLoaded", function(){
    showProcedures();
    searchBtn.addEventListener("click", performSearch);
});



function showProcedures(){
	
	var req = new XMLHttpRequest();
	req.open('GET', '/procedureNames', true);
	req.send();
		
    req.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    var arr = JSON.parse(this.responseText);


            for (var procedure of arr){
                for (var key in procedure){
                    var attrValue = procedure[key];
                    var a = document.createElement("OPTION");
                    a.setAttribute("value", attrValue);
		    a.setAttribute("name",attrValue);
                    var b = document.createTextNode(attrValue);
                    a.appendChild(b);
		    document.getElementById("procedureBox").appendChild(a);    
            }
        }	
        console.log(this.responseText);
		}

    console.log("THIS FIRED");
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



/*function showProcedures(){
	
	var req = new XMLHttpRequest();
	req.open('GET', '/procedureNames', true);
	req.send();
		
    req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
	
            for (var i = 0; i < arr.length; i++){
                var obj = arr[i];
                for (var key in obj){
                    var attrValue = obj[key];
                
                    var a = document.createElement("OPTION");
                    a.setAttribute("value", attrValue);
		            a.setAttribute("name",attrValue);
                    var b = document.createTextNode(attrValue);
                    a.appendChild(b);
		            document.getElementById("procedureBox").appendChild(a);    
                    }
        }	
        console.log(this.responseText);
		}

    console.log("THIS FIRED");
}
};*/
