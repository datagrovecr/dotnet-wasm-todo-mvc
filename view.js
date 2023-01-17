"use strict";
exports.__esModule = true;
exports.setDebug = exports.getFile = exports.bindEditItemCancel = exports.bindEditItemSave = exports.bindToggleItem = exports.bindRemoveItem = exports.bindToggleAll = exports.bindRemoveCompleted = exports.bindAddItem = exports.editItemDone = exports.setItemComplete = exports.clearNewTodo = exports.updateFilterButtons = exports.setCompleteAllCheckbox = exports.setMainVisibility = exports.setClearCompletedButtonVisibility = exports.setItemsLeft = exports.removeItem = exports.showItems = exports.editItem = exports.initView = void 0;
var helpers_js_1 = require("./helpers.js");
var _itemId = function (element) { return parseInt(element.parentNode.dataset.id || element.parentNode.parentNode.dataset.id, 10); };
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var $todoList;
var $todoItemCounter;
var $clearCompleted;
var $main;
var $toggleAll;
var $newTodo;
var $todoGetFile;
var $todoDebug;
function initView() {
    $todoGetFile = (0, helpers_js_1.qs)('.todo-getFile'); //Variable to get file
    $todoDebug = (0, helpers_js_1.qs)('.todoDebug');
    $todoList = (0, helpers_js_1.qs)('.todo-list');
    $todoItemCounter = (0, helpers_js_1.qs)('.todo-count');
    $clearCompleted = (0, helpers_js_1.qs)('.clear-completed');
    $main = (0, helpers_js_1.qs)('.main');
    $toggleAll = (0, helpers_js_1.qs)('.toggle-all');
    $newTodo = (0, helpers_js_1.qs)('.new-todo');
    (0, helpers_js_1.$delegate)($todoList, 'li label', 'dblclick', function (_a) {
        var target = _a.target;
        editItem(target);
    });
}
exports.initView = initView;
function editItem(target) {
    var listItem = target.parentElement.parentElement;
    listItem.classList.add('editing');
    var input = document.createElement('input');
    input.className = 'edit';
    input.value = target.innerText;
    listItem.appendChild(input);
    input.focus();
}
exports.editItem = editItem;
function showItems(itemsHtml) {
    $todoList.innerHTML = itemsHtml;
}
exports.showItems = showItems;
function removeItem(id) {
    var elem = (0, helpers_js_1.qs)("[data-id=\"".concat(id, "\"]"));
    if (elem) {
        $todoList.removeChild(elem);
    }
}
exports.removeItem = removeItem;
function setItemsLeft(itemsLeftHtml) {
    $todoItemCounter.innerHTML = itemsLeftHtml;
}
exports.setItemsLeft = setItemsLeft;
function setClearCompletedButtonVisibility(visible) {
    $clearCompleted.style.display = !!visible ? 'block' : 'none';
}
exports.setClearCompletedButtonVisibility = setClearCompletedButtonVisibility;
function setMainVisibility(visible) {
    $main.style.display = !!visible ? 'block' : 'none';
}
exports.setMainVisibility = setMainVisibility;
function setCompleteAllCheckbox(checked) {
    $toggleAll.checked = !!checked;
}
exports.setCompleteAllCheckbox = setCompleteAllCheckbox;
function updateFilterButtons(route) {
    (0, helpers_js_1.qs)('.filters .selected').className = '';
    (0, helpers_js_1.qs)(".filters [href=\"#/".concat(route, "\"]")).className = 'selected';
}
exports.updateFilterButtons = updateFilterButtons;
function clearNewTodo() {
    $newTodo.value = '';
}
exports.clearNewTodo = clearNewTodo;
function setItemComplete(id, completed) {
    var listItem = (0, helpers_js_1.qs)("[data-id=\"".concat(id, "\"]"));
    if (!listItem) {
        return;
    }
    listItem.className = completed ? 'completed' : '';
    // In case it was toggled from an event and not by clicking the checkbox
    (0, helpers_js_1.qs)('input', listItem).checked = completed;
}
exports.setItemComplete = setItemComplete;
function editItemDone(id, title) {
    var listItem = (0, helpers_js_1.qs)("[data-id=\"".concat(id, "\"]"));
    var input = (0, helpers_js_1.qs)('input.edit', listItem);
    listItem.removeChild(input);
    listItem.classList.remove('editing');
    (0, helpers_js_1.qs)('label', listItem).textContent = title;
}
exports.editItemDone = editItemDone;
function bindAddItem(handler) {
    (0, helpers_js_1.$on)($newTodo, 'change', function (_a) {
        var target = _a.target;
        var title = target.value.trim();
        if (title) {
            handler(title);
        }
    });
}
exports.bindAddItem = bindAddItem;
function bindRemoveCompleted(handler) {
    (0, helpers_js_1.$on)($clearCompleted, 'click', handler);
}
exports.bindRemoveCompleted = bindRemoveCompleted;
function bindToggleAll(handler) {
    (0, helpers_js_1.$on)($toggleAll, 'click', function (_a) {
        var target = _a.target;
        handler(target.checked);
    });
}
exports.bindToggleAll = bindToggleAll;
function bindRemoveItem(handler) {
    (0, helpers_js_1.$delegate)($todoList, '.destroy', 'click', function (_a) {
        var target = _a.target;
        handler(_itemId(target));
    });
}
exports.bindRemoveItem = bindRemoveItem;
function bindToggleItem(handler) {
    (0, helpers_js_1.$delegate)($todoList, '.toggle', 'click', function (_a) {
        var target = _a.target;
        handler(_itemId(target), target.checked);
    });
}
exports.bindToggleItem = bindToggleItem;
function bindEditItemSave(handler) {
    (0, helpers_js_1.$delegate)($todoList, 'li .edit', 'blur', function (_a) {
        var target = _a.target;
        if (!target.dataset.iscanceled) {
            handler(_itemId(target), target.value.trim());
        }
    }, true);
    // Remove the cursor from the input when you hit enter just like if it were a real form
    (0, helpers_js_1.$delegate)($todoList, 'li .edit', 'keypress', function (_a) {
        var target = _a.target, keyCode = _a.keyCode;
        if (keyCode === ENTER_KEY) {
            target.blur();
        }
    });
}
exports.bindEditItemSave = bindEditItemSave;
function bindEditItemCancel(handler) {
    (0, helpers_js_1.$delegate)($todoList, 'li .edit', 'keyup', function (_a) {
        var target = _a.target, keyCode = _a.keyCode;
        if (keyCode === ESCAPE_KEY) {
            target.dataset.iscanceled = true;
            target.blur();
            handler(_itemId(target));
        }
    });
}
exports.bindEditItemCancel = bindEditItemCancel;
function getFile() {
    return $todoGetFile.value;
}
exports.getFile = getFile;
function setDebug(text) {
    $todoDebug.value = text;
}
exports.setDebug = setDebug;
