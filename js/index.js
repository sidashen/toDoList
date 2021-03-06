var tasksContent = document.getElementsByClassName('tasks');
var showListContent = document.getElementsByClassName('all-list-content');
var listOutline = document.getElementsByClassName('list-outline');
var allActiveList = document.createElement('ol');
var tasksArr = [];
var index;
localStorage.setItem('toDoList', JSON.stringify(tasksArr));

listOutline[0].addEventListener('click', function (event) {
  let {classList} = event.target;
  if (classList.contains('add-list-btn')) {
    createToDoList();
    clearInputText();
  }  
  if (classList.contains('show-all')) {
    showAllList();
    selectBtnAction();
  }
  if (classList.contains('show-active')) {
    showActiveList();
  }
  if (classList.contains('show-complete')) {
    showCompleteList();
  }
})

document.onkeydown = function (event) {

  if (event && event.keyCode == 13) {
    event.preventDefault();
    createToDoList();
    clearInputText();
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

  var {key, tasksInfo, checkStatus} = selectBtnAction();
  tasksDataStorage(key, tasksInfo, checkStatus);

  deleteListControl();
}

function selectBtnAction() {
  var selectBtn = document.getElementsByClassName('check-box');
  var selectBtnArr = Array.from(selectBtn);
  var key = selectBtnArr.length;
  var tasksInfo = tasksContent[0].value;
  var checkStatus = '';

  selectBtnArr.forEach(item => {
    item.addEventListener('click', function (event) {
      let target = event.target;
      changeListStatus(target);
      changeCheckStatus(target, checkStatus);
    });
  });
  return {key, tasksInfo, checkStatus, selectBtnArr};
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

function judgeListIndex(list) {
  tasksArr.forEach(item => {
    if (item.tasks === list.innerText) {
      index = item.key - 1;
    }
  });
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
    deleteListControl();
  })
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

function deleteListControl() {
  tasksArr = JSON.parse(localStorage.getItem('toDoList'));
  var deleteListBtn = document.getElementsByClassName('delete-btn');
  var deleteListBtnArr = Array.from(deleteListBtn);

  deleteListBtnArr.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      var target = event.target;
      confirmDeleteAction(target);
    });
  });
}

function confirmDeleteAction(target) {
  var list = target.parentNode;
  var message = confirm('是否删除该 TODO？');

  if (message) {
    alert('做完了吗你就删');
    list.parentNode.removeChild(list);
  } else if(!message) {
    alert('卡是做不完的朋友');
  }
}
