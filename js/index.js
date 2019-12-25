var addListBtn = document.getElementsByClassName('add-list-btn');
var tasksContent = document.getElementsByClassName('tasks');
var showActiveBtn = document.getElementsByClassName('show-active');
var showCompleteBtn = document.getElementsByClassName('show-complete');
var showListContent = document.getElementsByClassName('all-list-content');
var showAllListBtn = document.getElementsByClassName('show-all');

addListBtn[0].addEventListener('click', function (){
  createToDoList();
  clearText();
});

showAllListBtn[0].addEventListener('click', showAllList);

// showActiveBtn[0].addEventListener('click', showNewList(target));

showCompleteBtn[0].addEventListener('click', hideNewList);

document.onkeydown = function (event) {

  if (event && event.keyCode == 13) {
    event.preventDefault();
    addListBtn[0].click();
  }
}

function createToDoList() {

  if (tasksContent[0].value)  {
    var listContent = document.createElement('li');
    listContent.innerHTML = `<input type="checkbox" class="check-box"/><span>${tasksContent[0].value}</span>`;
    showListContent[0].appendChild(listContent);
  } else {
  return;
  }

  var selectBtn = document.getElementsByClassName('check-box');
  var selectBtnArr = Array.from(selectBtn);
  selectBtnArr.forEach(item => {
    item.addEventListener('click', function (event) {
      var target = event.target;
      completeList(target);
    })
  });
  // localStorage.setItem('key', JSON.stringify(selectBtnArr));
}

function clearText() {
  tasksContent[0].value = '';
}

// function showNewList(target) {
//   if (target.checked) {
//     target.parentNode.style.visibility = 'visible';
//   } else {
//     target.parentNode.style.visibility = 'hidden';
//   }
// }

function hideNewList() {
  showListContent[0].style.visibility = 'hidden';
}

function completeList(target) {
  if (target.checked) {
    target.parentNode.style.color = 'grey';
    target.parentNode.style.textDecoration = 'line-through';
  } else {
    target.parentNode.style.color = 'black';
    target.parentNode.style.textDecoration = 'none';
  }
}

function showAllList() {
  showListContent[0].style.visibility = 'visible';
}
