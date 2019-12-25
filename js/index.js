var addListBtn = document.getElementsByClassName('add-list-btn');
var tasksContent = document.getElementsByClassName('tasks');
var showActiveBtn = document.getElementsByClassName('show-active');
var showCompleteBtn = document.getElementsByClassName('show-complete');
var showListContent = document.getElementsByClassName('all-list-content');

addListBtn[0].addEventListener('click', function (){
  createToDoList();
  clearText();
});

showActiveBtn[0].addEventListener('click', showNewList);

showCompleteBtn[0].addEventListener('click', hideNewList);

document.onkeydown = function (event) {

  if (event && event.keyCode == 13) {
    event.preventDefault();
    createToDoList();
    clearText();
  }
}

function createToDoList() {

  if (tasksContent[0].value)  {
    var listContent = document.createElement('li');
    listContent.innerHTML = `<input type="checkbox" class="check"/><span>${tasksContent[0].value}</span>`;
    showListContent[0].appendChild(listContent);
  } else {
  return;
  }
}

function clearText() {
  tasksContent[0].value = '';
}

function showNewList() {
  showListContent[0].style.visibility = 'visible';
}

function hideNewList() {
  showListContent[0].style.visibility = 'hidden';
}

