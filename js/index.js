var addListBtn = document.getElementsByClassName('add-list-btn');
var tasksContent = document.getElementsByClassName('tasks');
var showActiveBtn = document.getElementsByClassName('show-active');
var showCompleteBtn = document.getElementsByClassName('show-complete');
var showListContent = document.getElementsByClassName('all-list-content');
var showAllListBtn = document.getElementsByClassName('show-all');
var tasksArr = [];
localStorage.setItem('toDoList', JSON.stringify(tasksArr));

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
  var selectBtn = document.getElementsByClassName('check-box');
  var selectBtnArr = Array.from(selectBtn);
  var key = selectBtnArr.length;
  var tasksInfo = tasksContent[0].value;
  var checkStatus = '';

  if (tasksContent[0].value)  {
    var listContent = document.createElement('li');
    listContent.innerHTML = `<input type="checkbox" class="check-box"/><span>${tasksContent[0].value}</span>`;
    showListContent[0].appendChild(listContent);
  } else {
  return;
  }

  selectBtnArr.forEach(item => {
    item.addEventListener('click', function (event) {
      var target = event.target;
      completeList(target);
      changeCheckStatus(target);
    })
  });

  tasksDataStorage(key, tasksInfo, checkStatus);

  return selectBtnArr;
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

function changeCheckStatus(target) {
  if (target.checked) {
    checkStatus = 'checked';
  } else {
    checkStatus = '';
  }
  var index = judgeIndex(target.parentNode);
  tasksArr[index].isChecked = checkStatus;
  localStorage.setItem('toDoList', JSON.stringify(tasksArr));
}

function judgeIndex(list) {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));
  var index;
  tasksArr.forEach(item => {
    if (item.tasks === list.innerText) {
      index = item.key;
    }
  });
  return index;
}

// function showList(status) {
//   switch(status) {
//     case ():

//   }
// }

function showAllList() {
  showListContent[0].style.visibility = 'visible';
}

function tasksDataStorage(key, tasksInfo, checkStatus) {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));

  var tasksObj = {
    key: key,
    tasks: tasksInfo,
    isChecked: checkStatus
  }

  tasksArr.push(tasksObj);
  localStorage.setItem('toDoList', JSON.stringify(tasksArr));
}



