// JavaScript code
var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var completedList = document.querySelector(".completed-list");
var uncompletedList = document.querySelector(".uncompleted-list");

function inputLength() {
  return input.value.trim().length; // Trim leading/trailing whitespace
}

function createListElement() {
  if (inputLength() === 0) {
    return; // Don't add empty tasks
  }

  var li = document.createElement("li");
  var span = document.createElement("span");
  span.textContent = input.value;
  li.appendChild(span);

  var taskDiv = document.createElement("div");
  taskDiv.className = "task-div";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";

  taskDiv.appendChild(checkbox);
  li.appendChild(taskDiv);

  uncompletedList.appendChild(li);
  input.value = "";

  checkbox.addEventListener("change", function () {
    var listItem = this.closest("li");
    if (this.checked) {
      listItem.classList.add("done");
      completedList.appendChild(listItem);
    } else {
      listItem.classList.remove("done");
      uncompletedList.appendChild(listItem);
    }
    saveTasks();
  });

  var dBtn = document.createElement("button");
  var deleteIcon = document.createElement("i");
  var editIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-x");
  editIcon.classList.add("fa-solid", "fa-pen-to-square");
  dBtn.appendChild(editIcon);
  dBtn.appendChild(deleteIcon);
  li.appendChild(dBtn);

  dBtn.addEventListener("click", function (event) {
    var target = event.target;
    var listItem = target.closest("li");
    var deleteIcon = listItem.querySelector(".fa-x");
    var editIcon = listItem.querySelector(".fa-pen-to-square");

    if (target === deleteIcon) {
      deleteListItem(listItem);
    } else if (target === editIcon) {
      editListItem(listItem);
    }
  });

  function deleteListItem(listItem) {
    listItem.parentNode.removeChild(listItem);
    saveTasks();
  }

  function editListItem(listItem) {
    var taskText = listItem.querySelector("span");
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.textContent;
    listItem.replaceChild(editInput, taskText);

    editInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        taskText.textContent = editInput.value;
        if (listItem.contains(editInput)) {
          listItem.replaceChild(taskText, editInput);
          saveTasks();
        }
      }
    });
    editInput.focus();
  }

  saveTasks();
}

function addListAfterClick() {
  createListElement();
}

function addListAfterKeypress(event) {
  if (event.key === "Enter") {
    createListElement();
  }
}

function saveTasks() {
  var tasks = [];
  var items = document.querySelectorAll("li");
  items.forEach(function (item) {
    var task = {
      text: item.querySelector("span").textContent,
      done: item.classList.contains("done"),
    };
    tasks.push(task);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function retrieveTasks() {
  var savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    var tasks = JSON.parse(savedTasks);
    tasks.forEach(function (task) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.textContent = task.text;
      li.appendChild(span);

      var taskDiv = document.createElement("div");
      taskDiv.className = "task-div";

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.done;

      taskDiv.appendChild(checkbox);
      li.appendChild(taskDiv);

      if (task.done) {
        li.classList.add("done");
        completedList.appendChild(li);
      } else {
        uncompletedList.appendChild(li);
      }

      checkbox.addEventListener("change", function () {
        var listItem = this.closest("li");
        if (this.checked) {
          listItem.classList.add("done");
          completedList.appendChild(listItem);
        } else {
          listItem.classList.remove("done");
          uncompletedList.appendChild(listItem);
        }
        saveTasks();
      });

      var dBtn = document.createElement("button");
      var deleteIcon = document.createElement("i");
      var editIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-x");
      editIcon.classList.add("fa-solid", "fa-pen-to-square");
      dBtn.appendChild(editIcon);
      dBtn.appendChild(deleteIcon);
      li.appendChild(dBtn);

      dBtn.addEventListener("click", function (event) {
        var target = event.target;
        var listItem = target.closest("li");
        var deleteIcon = listItem.querySelector(".fa-x");
        var editIcon = listItem.querySelector(".fa-pen-to-square");

        if (target === deleteIcon) {
          deleteListItem(listItem);
        } else if (target === editIcon) {
          editListItem(listItem);
        }
      });

      function deleteListItem(listItem) {
        listItem.parentNode.removeChild(listItem);
        saveTasks();
      }

      function editListItem(listItem) {
        var taskText = listItem.querySelector("span");
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent;
        listItem.replaceChild(editInput, taskText);

        editInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            taskText.textContent = editInput.value;
            if (listItem.contains(editInput)) {
              listItem.replaceChild(taskText, editInput);
              saveTasks();
            }
          }
        });
        editInput.focus();
      }
    });
  }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

retrieveTasks();
