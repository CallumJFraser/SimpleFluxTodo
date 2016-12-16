const Dispatcher = require('../dispatcher');
const setupObserver = require('../setupObserver');

const todoStore = {};
const publish = setupObserver(todoStore);
//  Store handles storage and updates components that care about its events
var _todos = [{id: 1, text: 'Try Me'}];

if (localStorage && localStorage.simpleFluxTodos) {
    _todos = JSON.parse(localStorage.simpleFluxTodos);
}

var create = todo => {
    var todoItem = Object.assign({}, todo, {
        id: new Date(),
        text: 'A new item'
    });
    _todos.push(todoItem);
};

var remove = id => {
    _todos = _todos.filter(item => {
        return item.id !== id;
    });
};

var update = todo => {
    _todos = _todos.map(item => {
        if (item.id === todo.id) {
            return todo;
        }
        return item;
    });
};

const dispatchId = Dispatcher.subscribe(payload => {
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
    localStorage.setItem('simpleFluxTodos', JSON.stringify(_todos));
    publish({
        action: 'UPDATE'
    });
});

todoStore.getTodos = () => {
    return _todos;
};

module.exports = todoStore;