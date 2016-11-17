const Dispatcher = require('../dispatcher');

//  Store handles storage and updates components that care about its events
var _callbacks = [];
var _todos = [{id: 1, text: 'Try Me'}];

if (localStorage && localStorage.todos) {
    _todos = JSON.parse(localStorage.todos);
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

var dispatchMessage = payload => {
    _callbacks.forEach(function (callback) {
        if (typeof callback === 'function') {
            callback(payload);
        }
    });
};

module.exports = {
    getTodos: () => {
        return _todos;
    },
    handleDispatch: Dispatcher.register(payload => {
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
        localStorage.setItem('todos', JSON.stringify(_todos));
        dispatchMessage({
            action: 'UPDATE'
        });
    }),
    register: callback => {
        const callbackId = _callbacks.length;
        _callbacks.push(callback);
        return callbackId;
    },
    unregister: callbackId => {
        _callbacks.splice(callbackId, 1);
    }
};