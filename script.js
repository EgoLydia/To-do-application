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
