const addItem = document.getElementById("add-btn");
const newInput = document.getElementById("input-text");
const tasks = document.getElementById("tasks");

addItem.addEventListener("click", addToDo);
function addToDo() {
  let text = newInput.value;
  tasks.innerHTML += ` 
                <div class="item">
                 <input class="item-check" type="checkbox" />
                 <input type="text" class="item-text" readonly value="${newInput.value}"></input>
                 <div class="action-btn">
                     <span class="edit-btn"><i class="bi bi-pencil"></i></span>
                     <span class="save-btn" style="display:none;"><i class="bi bi-check-circle"></i></span>
                     <span class="delete-btn"><i class="bi bi-trash3"></i></span>
                 </div>
              </div>
           `;

  let deleteButtons = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      const row = deleteButtons[i].parentNode.parentNode;
      row.parentNode.removeChild(row);
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
    });
  }

