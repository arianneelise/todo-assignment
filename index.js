let listItem;

function addListItem(e, content = null) {
  if (content) {
    listItem = content;
  } else {
    e.preventDefault();
    listItem = document.querySelector(".todo-input").value;
    if (listItem == "") {
      return;
    }
    document.querySelector(".todo-input").value = "";
  }

  const p = document.querySelector("p");
  p.innerHTML = `${listItem}`;
  const listDefault = document.querySelector(".default");
  const newDiv = listDefault.cloneNode((deep = true));
  newDiv.classList.add("show");
  newDiv.classList.remove("default");
  p.innerHTML = "";
  const ul = document.querySelector(".todo");
  ul.appendChild(newDiv);
}

function deleteListItem(event) {
  const itemToDelete = event.target.parentNode.parentElement;
  if (itemToDelete.classList.contains("show")) {
    itemToDelete.remove();
  } else {
    event.target.parentNode.remove();
  }
}

function completeListItem(e) {
  const itemToComplete = e.target.parentNode.parentElement.parentElement;
  const textToTransfer =
    itemToComplete.firstElementChild.firstElementChild.innerText;
  itemToComplete.remove();

  const completeList = document.querySelector(".completed-item");
  console.log("Element:", completeList.firstElementChild);
  completeList.firstElementChild.firstElementChild.innerText = textToTransfer;
  completeList.classList.add("show");
}

function revertListItem(e) {
  const itemToRevert = e.target.parentNode.parentElement.parentElement;
  const textToTransfer =
    itemToRevert.firstElementChild.firstElementChild.innerText;
  itemToRevert.remove();
  addListItem((e = null), (content = textToTransfer));
}

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", (event) => {
  addListItem(event);
});

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-circle-check")) {
    completeListItem(event);
  } else if (event.target.classList.contains("delete")) {
    deleteListItem(event);
  } else if (event.target.classList.contains("revert")) {
    revertListItem(event);
  }
});
