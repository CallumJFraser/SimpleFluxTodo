const Dispatcher = require('../dispatcher');
const setupObserver = require('../setupObserver');

const localStorageName = 'SimpleFluxTodos';
const todoStore = {};
const publish = setupObserver(todoStore);

//  Store handles storage and updates components that care about its events
var _todos = [{id: 1, text: 'Try Me'}];
if (localStorage && localStorage[localStorageName]) {
    _todos = JSON.parse(localStorage[localStorageName]);
}

const create = todo => {
    const todoItem = Object.assign({
        id: new Date(),
        text: 'A new item'
    }, todo);
    _todos.push(todoItem);
};

const remove = id => {
    _todos = _todos.filter(item => {
        return item.id !== id;
    });
};

const update = todo => {
    _todos = _todos.map(item => {
        if (item.id === todo.id) {
            return todo;
        }
        return item;
    });
};

const handleDispatch = payload => {
    switch(payload.action) {
        case 'TODO_CREATE':
            create(payload.data);
            break;
        case 'TODO_REMOVE':
            remove(payload.data);
            break;
        case 'TODO_UPDATE':
            update(payload.data);
            break;
    }
    localStorage.setItem(localStorageName, JSON.stringify(_todos));
    publish({
        action: 'UPDATE'
    });
};

const dispatchId = Dispatcher.subscribe(handleDispatch);

todoStore.getTodos = () => {
    return _todos;
};

todoStore.unload = function () {
    Dispatcher.unsubscribe(dispatchId);
};

module.exports = todoStore;
