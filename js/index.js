var addListBtn = document.getElementsByClassName('add-list-btn');
var tasksContent = document.getElementsByClassName('tasks');

addListBtn[0].addEventListener ('click', function (){
  createToDoList();
  clearText();
});

document.onkeydown = function (event) {
 
  if (e && e.keyCode == 13) {
    event.preventDefault();
    createToDoList();
    clearText();
  }
}

function createToDoList() {
  var showListContent = document.getElementsByClassName('list-content');

  if (tasksContent[0].value)  {
    var listContent = document.createElement('li');
    listContent.innerHTML = `<input type="checkbox" class="check"/>${tasksContent[0].value}`;
    showListContent[0].appendChild(listContent);
  } else {
  return;
  }
}

function clearText() {
  tasksContent[0].value = '';
}

