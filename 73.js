var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength() {
  return input.value.length;
}

function createListElement() {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  input.value = "";

  function crossOut() {
    li.classList.toggle("done");
    saveTasks();
  }
  li.addEventListener("click", crossOut);

  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  function deleteListItem() {
    li.parentNode.removeChild(li); // Remove the list item from the page
    saveTasks();
  }

  saveTasks();
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    createListElement();
  }
}

function saveTasks() {
  var tasks = [];
  for (var i = 0; i < item.length; i++) {
    var task = {
      text: item[i].textContent,
      done: item[i].classList.contains("done")
    };
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function retrieveTasks() {
  var savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    var tasks = JSON.parse(savedTasks);
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(tasks[i].text));
      ul.appendChild(li);

      if (tasks[i].done) {
        li.classList.add("done");
      }

      function crossOut() {
        this.classList.toggle("done");
        saveTasks();
      }
      li.addEventListener("click", crossOut);

      var dBtn = document.createElement("button");
      dBtn.appendChild(document.createTextNode("X"));
      li.appendChild(dBtn);
      dBtn.addEventListener("click", deleteListItem.bind(null, li)); // Pass the list item as an argument

      function deleteListItem(listItem) {
        listItem.parentNode.removeChild(listItem); // Remove the list item from the page
        saveTasks();
      }
    }
  }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

retrieveTasks();
