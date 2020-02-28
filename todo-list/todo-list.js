const itemsCount = document.getElementById('itemsCount');
const activeItems = document.getElementById('activeItems');
const allItems = document.getElementById('allItems');
const completedItems = document.getElementById('completedItems');
const selectAll = document.getElementById('all');
const container = document.getElementById('container');
let input = document.getElementById('addElement');
let todoList = document.getElementById('todoList');
let clearCompletedItems = document.getElementById('clearCompleted');
let removeElementsList = document.getElementsByClassName('remove');
let checkList = document.getElementsByClassName('check');

input.onkeypress = (event) => {
    if ((event.keyCode) === 13) {
        addNewElementTotodoList(event.target.value);
    }
};

//Adding new element to the list

function addNewElementTotodoList(value) {
    if (value !== '') {
        let listItem = createHTMLElement('li');
        let element = createHTMLElement('input');
        let checkbox = createHTMLElement('input');
        let removeElement = createHTMLElement('span');
        element.type = 'text';
        element.classList.add('notCompleted');
        element.value = value;
        checkbox.type = 'checkbox';
        checkbox.className = 'check';
        removeElement.textContent = "×";
        removeElement.className = 'remove';
        listItem.classList.add('newListItem');
        appendChildToItem(checkbox, listItem);
        appendChildToItem(element, listItem);
        appendChildToItem(removeElement, listItem);
        appendChildToItem(listItem, todoList);
        input.value = '';
        updateitemsData();
        removeItems();
        updateCheckListStatus();
        editStatusOfItems();

    }
    else {
        alert("todo shouldn't be empty!");
    }
}

function appendChildToItem(child, item) {
    item.appendChild(child);
}

function editStatusOfItems() {
    let newListItems = document.getElementsByClassName('newListItem');
    let i = newListItems.length - 1;
    while (i >= 0) {
        newListItems[i].onkeypress = (event) => {
            if (event.keyCode === 13) {
                if (event.target.value === '') {
                    alert("todo shouldn't be empty");
                }
                else {
                    event.target.blur();
                }
            }
        };
        i -= 1;
    }
}

selectAll.onclick = () => {
    for (let item = 0; item < checkList.length; item++) {
        checkList[item].checked = true;
        checkedChecklist(checkList[item]);
    }
    updateitemsData();
};

function checkedChecklist(target) {
    target.nextElementSibling.className = 'completed';
    target.nextElementSibling.disabled = true;
}

function unCheckedChecklist(target) {
    target.nextElementSibling.disabled = false;
    target.nextElementSibling.className = 'notCompleted';
}

function updateCheckListStatus() {
    for (let i = 0; i < checkList.length; i++) {
        (checkList[i].onchange) = function() {
            if (checkList[i].checked) {
                checkedChecklist(checkList[i]);
            }
            else {
                unCheckedChecklist(checkList[i]);
            }
            updateitemsData();
            removeItems();
            editStatusOfItems();
        };
    }
}

function removeItems() {
    for (let i = 0; i < removeElementsList.length; i++) {
        removeElementsList[i].onclick = function(event) {
            if (confirm('Are you sure?')) {
                let li = event.target.parentElement;
                li.remove();
                updateitemsData();
                updateCheckListStatus();
                editStatusOfItems();
            }
            else {

            }
        };
    }
}

function updateitemsData() {
    let itemsLeft = document.getElementsByClassName('notCompleted');
    let count;
    if (itemsLeft.length === 0 && checkList.length === 0) {
        itemsCount.parentElement.classList.add('empty');
        container.classList.remove('shadow');
    }
    else if (itemsLeft.length === 1) {
        count = `${itemsLeft.length} item left`;
        itemsCount.parentElement.classList.remove('empty');
        container.classList.add('shadow');
    }
    else {
        count = `${itemsLeft.length} items left`;
        itemsCount.parentElement.classList.remove('empty');
        container.classList.add('shadow');
    }
    itemsCount.innerHTML = count;
}

function createHTMLElement(tag) {
    let htmlElement = document.createElement(tag);
    return htmlElement;
}
let CompletedItems = document.getElementsByClassName('completed');
let unCompletedItems = document.getElementsByClassName('notCompleted');

clearCompletedItems.onclick = () => {
    let CompletedItems = document.getElementsByClassName('completed');
    let i = CompletedItems.length - 1;
    while (i >= 0) {
        todoList.removeChild(CompletedItems[i].parentElement);
        i -= 1;
    }
    updateitemsData();
    updateCheckListStatus();
    removeItems();
    editStatusOfItems();
};
completedItems.onclick = (event) => {
    for (let i = 0; i < unCompletedItems.length; i++) {
        unCompletedItems[i].parentElement.classList.add('hide');
    }
    for (let i = 0; i < CompletedItems.length; i++) {
        CompletedItems[i].parentElement.classList.remove('hide');
    }
    updateitemsData();
    updateCheckListStatus();
    removeItems();
    editStatusOfItems();
    event.target.className = 'filter';
    event.target.previousElementSibling.className = 'in-active';
    event.target.previousElementSibling.previousElementSibling.className = 'in-active';
};
allItems.onclick = (event) => {
    for (let i = 0; i < CompletedItems.length; i++) {
        CompletedItems[i].parentElement.classList.remove('hide');
    }
    for (let i = 0; i < unCompletedItems.length; i++) {
        unCompletedItems[i].parentElement.classList.remove('hide');
    }
    updateitemsData();
    updateCheckListStatus();
    removeItems();
    editStatusOfItems();
    event.target.className = 'filter';
    event.target.nextElementSibling.className = 'in-active';
    event.target.nextElementSibling.nextElementSibling.className = 'in-active';
};
activeItems.onclick = (event) => {
    for (let i = 0; i < CompletedItems.length; i++) {
        CompletedItems[i].parentElement.classList.add('hide');
    }
    for (let i = 0; i < unCompletedItems.length; i++) {
        unCompletedItems[i].parentElement.classList.remove('hide');
    }

    updateitemsData();
    updateCheckListStatus();
    removeItems();
    editStatusOfItems();
    event.target.className = 'filter';
    event.target.previousElementSibling.className = 'in-active';
    event.target.nextElementSibling.className = 'in-active';
};
