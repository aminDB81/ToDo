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
  var deleteIcon = document.createElement("i");
  var editIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-x");
  editIcon.classList.add("fa-solid", "fa-pen-to-square");
  dBtn.appendChild(editIcon);
  dBtn.appendChild(deleteIcon);
  li.appendChild(dBtn);

  dBtn.addEventListener("click", handleButtonClick); // Attach event listener to the button

  function handleButtonClick(event) {
    var target = event.target;
    var listItem = target.closest("li");
    var deleteIcon = listItem.querySelector(".fa-x");
    var editIcon = listItem.querySelector(".fa-pen-to-square");

    if (target === deleteIcon) {
      deleteListItem(listItem);
    } else if (target === editIcon) {
      editListItem(listItem);
    }
  }

  function deleteListItem(listItem) {
    listItem.parentNode.removeChild(listItem); // Remove the list item from the page
    saveTasks();
  }

  function editListItem(listItem) {
    // Handle edit functionality here
    console.log("Edit clicked");
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
      done: item[i].classList.contains("done"),
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
      var deleteIcon = document.createElement("i");
      var editIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-x");
      editIcon.classList.add("fa-solid", "fa-pen-to-square");
      dBtn.appendChild(editIcon);
      dBtn.appendChild(deleteIcon);
      li.appendChild(dBtn);

      dBtn.addEventListener("click", handleButtonClick); // Attach event listener to the button

      function handleButtonClick(event) {
        var target = event.target;
        var listItem = target.closest("li");
        var deleteIcon = listItem.querySelector(".fa-x");
        var editIcon = listItem.querySelector(".fa-pen-to-square");

        if (target === deleteIcon) {
          deleteListItem(listItem);
        } else if (target === editIcon) {
          editListItem(listItem);
        }
      }

      function deleteListItem(listItem) {
        listItem.parentNode.removeChild(listItem); // Remove the list item from the page
        saveTasks();
      }

function editListItem(listItem) {
  var taskText = listItem.firstChild;
  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = taskText.textContent;
  listItem.replaceChild(editInput, taskText);

  editInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      taskText.textContent = editInput.value;
      listItem.replaceChild(taskText, editInput);
      saveTasks();
    }
  });

  // Handle click outside the input to update the task value
  var isEditing = true; // Flag to track if editing is in progress

  editInput.addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent click event from propagating to document
    isEditing = true; // Set editing flag to true
  });

  document.addEventListener("click", function(event) {
    if (!isEditing) {
      taskText.textContent = editInput.value;
      listItem.replaceChild(taskText, editInput);
      saveTasks();
    }
    isEditing = false; // Reset editing flag to false after click event
  });
}
    }
  }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

retrieveTasks();
