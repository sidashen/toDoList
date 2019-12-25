var addListBtn = document.getElementsByClassName('add-list-btn');
addListBtn[0].addEventListener ('click', createToDoList)

function createToDoList() {
  var showListContent = document.getElementsByClassName('list-content');
  var tasksContent = document.getElementsByClassName('tasks');

  if (tasksContent[0].value)  {
    var listContent = document.createElement('li');
    listContent.innerHTML = `<input type="checkbox" class="check"/>${tasksContent[0].value}`;
    showListContent[0].appendChild(listContent);
    console.log(listContent);
  } else {
 return;
  }
}

function clearText() {
  
}

