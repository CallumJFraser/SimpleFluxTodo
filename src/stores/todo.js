const Dispatcher = require('../dispatcher');
const setupObserver = require('../setupObserver');

const localStorageName = 'SimpleFluxTodos';
const todoStore = {};
const publish = setupObserver(todoStore);

const getTodos = () => {
    if (localStorage && localStorage[localStorageName]) {
        return JSON.parse(localStorage[localStorageName]);
    }
    return [{id: 1, text: 'Try Me'}];
};

const setTodos = sinList => {
    localStorage.setItem(localStorageName, JSON.stringify(sinList));
};

const create = todo => {
    var _todos = getTodos();
    const todoItem = Object.assign({
        id: new Date(),
        text: 'A new item'
    }, todo);
    _todos.push(todoItem);

    setTodos(_todos);
};

const remove = id => {
    var _todos = getTodos();
    _todos = _todos.filter(item => {
        return item.id !== id;
    });

    setTodos(_todos);
};

const update = todo => {
    var _todos = getTodos();
    _todos = _todos.map(item => {
        if (item.id === todo.id) {
            return todo;
        }
        return item;
    });

    setTodos(_todos);
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
    publish({
        action: 'UPDATE'
    });
};

const dispatchId = Dispatcher.subscribe(handleDispatch);

todoStore.getTodos = getTodos;

todoStore.unload = function () {
    Dispatcher.unsubscribe(dispatchId);
};

module.exports = todoStore;
