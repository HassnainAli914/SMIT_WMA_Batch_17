// assignment - show less clickable button with sliced text
// --------------------- Start ---------------------
var paraTexts = document.getElementById("seeLess").innerText
var isActive = true;

function seeLess() {
    var result = paraTexts.slice(0, 15) + "...";
    document.getElementById("seeLess").innerText = result;
    console.log(result);
}
function seeMore() {
    if (isActive == true) {
        document.getElementById("seeLess").innerText = paraTexts;
        document.getElementById("seeMore").innerHTML = "See Less";
        isActive = false;
    } else {
        document.getElementById("seeLess").innerHTML = paraTexts.slice(0, 15) + "...";
        document.getElementById("seeMore").innerHTML = "See More";
        isActive = true;
    }
    console.log(paraTexts);
}
// --------------------- End ---------------------


//  assignment - individual check name and email validation
// --------------------- Start ---------------------
function checkValid() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var emailCheck = email.includes("@") && email.includes(".com");

    if (name === "" || email === "") {
        alert("Please fill all the fields");
        document.getElementById("submit").type = "button";
        return false;
    } else if (!emailCheck) {
        alert("Please enter a valid email with @ and .com");
        document.getElementById("submit").type = "button";
        return false;
    }
    else {
        alert("Thank you " + name + ", we have received your email as " + email);
        document.getElementById("submit").type = "submit";
        return true;
    }
}
// --------------------- End ---------------------


// assignment -- create a modern style div with border colors shadow and insert a defined image 
// --------------------- Start ---------------------
function styledDiv() {
    var div = document.getElementById("styledDiv");
    div.style.cssText = "width:300px; border-radius: 10px; border:2px solid black; box-shadow: 5px 10px 18px #888888; padding:10px; margin-top:20px;";
}
// --------------------- End ---------------------