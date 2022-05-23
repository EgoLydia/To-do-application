let items = JSON.parse(localStorage.getItem("todo-list")) || [];

const addItem = document.getElementById("add-btn");
const newInput = document.getElementById("input-text");
const tasks = document.getElementById("tasks");
const clearAll = document.getElementById("clearAll");

addItem.addEventListener("click", addToDo);
newInput.addEventListener("keyup", processKeyPress);
clearAll.addEventListener("click", clearList);

tasks.innerHTML = items;
addEventFunction();

function addToDo() {
  let text = newInput.value;
  tasks.innerHTML += ` 
                <div class="task-item">
                 <input class="task-check" type="checkbox" />
                 <input type="text" class="task-text" readonly value="${text}"></input>
                 <div class="action-btn">
                     <span class="edit-btn"><i class="bi bi-pencil"></i></span>
                     <span class="save-btn" style="display:none;"><i class="bi bi-check-circle"></i></span>
                     <span class="delete-btn"><i class="bi bi-trash3"></i></span>
                     </div>
                     </div>
                   `;
  addEventFunction();
  newInput.value = "";
  save();
  addItem.disabled = true;
}

function save() {
  localStorage.setItem("todo-list", JSON.stringify(tasks.innerHTML));
}

function addEventFunction() {
  let deleteButtons = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      const row = deleteButtons[i].parentNode.parentNode;
      row.parentNode.removeChild(row);

      save();
    });
  }

  let editButtons = document.querySelectorAll(".edit-btn");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", (e) => {
      const parent = editButtons[i].parentNode;
      parent.parentNode.children[1].removeAttribute("readonly");
      parent.parentNode.children[1].focus();

      parent.children[1].style.display = "block";
      parent.children[0].style.display = "none";

      save();
    });
  }

  let saveButtons = document.querySelectorAll(".save-btn");
  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", (e) => {
      const parent = saveButtons[i].parentNode;
      parent.parentNode.children[1].setAttribute("readonly", true);
      parent.parentNode.children[1].setAttribute("value", parent.parentNode.children[1].value);

      parent.children[1].style.display = "none";
      parent.children[0].style.display = "block";
      console.log( parent.parentNode.children[1].value);
      save();
    });
  }

  let checkBox = document.querySelectorAll(".task-check");
  for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].checked =
    checkBox[i].parentNode.children[1].classList.contains("completed");
    checkBox[i].onchange = (e) => {
      const parent = checkBox[i].parentNode;
      if (e.target.checked) {
        parent.children[1].classList.add("completed");
      } else {
        parent.children[1].classList.remove("completed");
      }
      save();
    };
  }
}
function clearList() {
  if (tasks.innerHTML === "") {
    alert("There are no task here!");
  } else {
    tasks.innerHTML = "";
  }
  save();
}

function processKeyPress(event) {
  addItem.disabled = event.target.value.trim() === "";
  if (event.key === "Enter") {
    addToDo();
  }
}
