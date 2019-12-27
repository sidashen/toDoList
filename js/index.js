var addListBtn = document.getElementsByClassName('add-list-btn');
var tasksContent = document.getElementsByClassName('tasks');
var showActiveBtn = document.getElementsByClassName('show-active');
var showCompleteBtn = document.getElementsByClassName('show-complete');
var showListContent = document.getElementsByClassName('all-list-content');
var showAllListBtn = document.getElementsByClassName('show-all');
var listOutlineDOM = document.getElementsByClassName('list-outline');
var footerDOM = document.getElementsByClassName('footer');
var allActiveList = document.createElement('ol');
var tasksArr = [];
var index;
localStorage.setItem('toDoList', JSON.stringify(tasksArr));

addListBtn[0].addEventListener('click', function (){
  createToDoList();
  clearInputText();
});

showAllListBtn[0].addEventListener('click', function () {
  showAllList();
  selectBtnAction();
});

showActiveBtn[0].addEventListener('click', showActiveList);

showCompleteBtn[0].addEventListener('click', showCompleteList);

document.onkeydown = function (event) {

  if (event && event.keyCode == 13) {
    event.preventDefault();
    addListBtn[0].click();
  }
}

function createToDoList() {
  if (tasksContent[0].value)  {
    var listContent = document.createElement('li');
    listContent.innerHTML = `<input type="checkbox" class="check-box"/><span>${tasksContent[0].value}</span><input value="×" class="delete-btn"/>`;
    showListContent[0].appendChild(listContent);
  } else {
  return;
  }

  var { key, tasksInfo, checkStatus} = selectBtnAction();
  tasksDataStorage(key, tasksInfo, checkStatus);

  // deleteListBtn[0].addEventListener('click', deleteList(event, selectBtn));
}

function selectBtnAction() {
  var selectBtn = document.getElementsByClassName('check-box');
  var selectBtnArr = Array.from(selectBtn);
  // var deleteListBtn = document.getElementsByClassName('delete-btn');
  var key = selectBtnArr.length;
  var tasksInfo = tasksContent[0].value;
  var checkStatus = '';
  selectBtnArr.forEach(item => {
    item.addEventListener('click', function (event) {
      var target = event.target;
      changeListStatus(target);
      changeCheckStatus(target, checkStatus);
    });
  });
  return { key, tasksInfo, checkStatus};
}

function clearInputText() {
  tasksContent[0].value = '';
}

function changeListStatus(target) {
  if (target.checked) {
    target.parentNode.style.color = 'grey';
    target.parentNode.style.textDecoration = 'line-through';
  } else {
    target.parentNode.style.color = 'black';
    target.parentNode.style.textDecoration = 'none';
  }
}

function changeCheckStatus(target, checkStatus) {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));

  if (target.checked) {
    checkStatus = 'checked';
  } else {
    checkStatus = '';
  }

  judgeListIndex(target.parentNode);
  tasksArr[index].isChecked = checkStatus;
  localStorage.setItem('toDoList', JSON.stringify(tasksArr));
}

function judgeListIndex(list) {
  tasksArr.forEach(item => {
    if (item.tasks === list.innerText) {
      index = item.key - 1;
    }
  });
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

function showAllList() {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));
  showListContent[0].innerHTML = '';

  tasksArr.forEach(item => {
    var singleList = document.createElement('li');
    var hasChecked = item.isChecked ? "checked" : "";
    singleList.innerHTML = `<input type="checkbox" class="check-box" ${hasChecked}/><span>${item.tasks}</span><input value="×" class="delete-btn"/>`;
    showListContent[0].appendChild(singleList);

    selectBtnWithoutEvent();
  })
}

function selectBtnWithoutEvent() {
  var selectBtnApplication = document.getElementsByClassName('check-box');
  var selectBtnApplicationArr = Array.from(selectBtnApplication);
  selectBtnApplicationArr.forEach(item => {
    if (item.checked) {
      item.parentNode.style.color = 'grey';
      item.parentNode.style.textDecoration = 'line-through';
    }
    else {
      item.parentNode.style.color = 'black';
      item.parentNode.style.textDecoration = 'none';
    }
  });
}

function showActiveList() {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));
  showListContent[0].innerHTML = '';

  tasksArr.forEach(item => {
    if (item.isChecked === '') {
      var singleActiveList = document.createElement('li');
      var hasChecked = item.isChecked ? "checked" : "";
      singleActiveList.innerHTML = `<input type="checkbox" class="check-box" ${hasChecked}/><span>${item.tasks}</span><input value="×" class="delete-btn"/>`;
      showListContent[0].appendChild(singleActiveList);
    }

  })
}

function showCompleteList() {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));
  showListContent[0].innerHTML = '';

  tasksArr.forEach(item => {
    if (item.isChecked === 'checked') {
      var singleCompleteList = document.createElement('li');
      var hasChecked = item.isChecked ? "checked" : "";
      singleCompleteList.innerHTML = `<input type="checkbox" class="check-box" ${hasChecked}/><span>${item.tasks}</span><input value="×" class="delete-btn"/>`;
      showListContent[0].appendChild(singleCompleteList);
    };

    selectBtnWithoutEvent();
  })
}

// function deleteList(event, selectBtn) {
//   for (i = 0; i < selectBtn.length; i++) {
//     selectBtn[i].checked = event.target.checked;
//     event.target.parentNode.parentNode.removeChild(event.target.parentNode);
//   }
// }



