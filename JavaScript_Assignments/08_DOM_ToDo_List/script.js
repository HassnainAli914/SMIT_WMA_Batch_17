let add = document.getElementById("add");
let popupClose = document.getElementById("close")
var popup = document.getElementById("popup");
var popupError = document.getElementById("error");

popupClose.addEventListener('click', function () {
    popup.style.display = (popup.style.display === 'none') ? 'block' : 'none';

})

add.addEventListener('click', function () {
    let value = document.getElementById("input").value;
    let item = document.createElement("li");
    // let colspan = document.createAttribute(colspan, '2')
    let input = document.createElement("input");
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.setAttribute('id', 'edit');
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('id', 'delete')
    
    
    
    if (value.trim() !== "") {
        // List item Appearing
        body.appendChild(tr).appendChild(td1).appendChild(item).textContent = value;

        // Buttons Appearing
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';
        body.appendChild(tr).appendChild(td2).appendChild(editBtn);
        body.appendChild(tr).appendChild(td3).appendChild(deleteBtn);
        document.getElementById("input").value = '';
        popup.style.display = 'none';
    } else {
        if (value.trim() === item.innerText.any) {
            alert("Dublicate List Error!")
        } else if (value.trim() === "") {
            popup.style.display = 'block';
            popupError.innerText = 'Empty Field Error!';
            // alert("Empty Field Error!")
        }
    }
    // Delete Button Functionality
    deleteBtn.addEventListener('click', function () {
        body.removeChild(tr);
    })
    // Edit Button Functionality
    editBtn.addEventListener('click', function () {
        // editBtn.textContent = (editBtn.textContent === 'Edit') ? 'Update' : 'Edit';
        if (editBtn.textContent === 'Edit') {
            editBtn.textContent = 'Update';
            input.type = 'search';
            input.value = item.innerText;
            item.replaceWith(input);
        }
        else if (editBtn.textContent === 'Update') {
            if (input.value.trim() !== "") {
                item.innerText = input.value;
                editBtn.textContent = 'Edit'
                popup.style.display = 'none';
                return input.replaceWith(item);
            } else {
                popup.style.display = 'block';
                popupError.innerText = 'Empty Field Error!';
                // alert("Empty Field Error!")
            }
        }
    })
    console.log(`Item Added Successfully Added Named = ${item.innerText}`);
});

let theme = document.getElementById("theme");
let colorBox = document.getElementById("fieldset");
theme.addEventListener('click', function () {
    let newColor = theme.value;
    let color = document.getElementById("fieldset");
    colorBox.style.backgroundColor = newColor;
    console.log("Theme changed to:", newColor);
});
