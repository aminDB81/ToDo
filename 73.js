var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLenght() {
    return input.value.length;
}

function createListElement() 
{
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value="";

    function crossOut() {
        li.classList.toggle("done");
        
    }
    li.addEventListener("click",crossOut);

    var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click",deleteListIem);

    function deleteListIem()
    {
        li.classList.add("delete")
    }
}

function addlistAfterClick()
{
    if (inputLenght() > 0) {
        createListElement();
    }
}

function addlistAfterKeypress()
{
    if (inputLenght() > 0 && event.which === 13) {
        createListElement();
    }
}




enterButton.addEventListener("click",addlistAfterClick);
input.addEventListener("keypress",addlistAfterKeypress);