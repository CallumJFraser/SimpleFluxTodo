/*
    TODO
    * Refine event functions
    * Split up into seperate files
    * CSS
*/
//  Dispatcher used to send messages to stores that care about events
const Dispatcher = (() => {
    var _callbacks = [];

    return {
        register: callback => {
            _callbacks.push(callback);
        },
        dispatch: payload => {
            _callbacks.forEach(callback => {
                if (typeof callback === 'function') {
                    callback(payload);
                }
            });
        }
    };
})();

//  Immediately-invoked functions `(() => {...})()` are used here with the modules
//  to make _callbacks and _todos unavailable outside the function.

//  Store handles storage and updates components that care about its events
const TodoStore = (() => {
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

    return {
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
})();

//  React Components
//  TodoItem handles individual Todo actions (removal and update)
const TodoItem = React.createClass({
    _onChange: function (event) {
        var eventData = {
            id: this.props.item.id,
            text: event.target.value
        };

        Dispatcher.dispatch({
            action: 'TODO_UPDATE',
            data: eventData
        });
    },
    _removeItem: function () {
        Dispatcher.dispatch({
            action: 'TODO_REMOVE',
            data: this.props.item.id
        })
    },
    render: function TotoItemRender () {
        return (
            <li className="todo-item" key={this.props.item.id}>
                <input className="todo-item__text" name="text" value={this.props.item.text} onChange={this._onChange}/>
                <button className="button todo-item__remove" onClick={this._removeItem}>Remove</button>
            </li>
        );
    }
});

//  TodoList handles multiple Todo actions (add)
const TodoList = React.createClass({
    getInitialState: () => {
        return {
            items: TodoStore.getTodos()
        }
    },
    componentDidMount: function () {
        var taskId = TodoStore.register(payload => {
            if (payload.action === 'UPDATE') {
                this._onChange();
            }
        });
        this.setState({
            taskId
        })
    },
    componentWillUnmount: function () {
        TodoStore.unregister(this.state.taskId);
    },
    _addItem: () => {
        Dispatcher.dispatch({
            action: 'TODO_CREATE',
            data: {}
        });
    },
    _onChange: function () {
        this.setState({
            items: TodoStore.getTodos()
        });
    },
    render: function TodoListRender () {
        var todos = [];
        this.state.items.forEach(function (item) {
            todos.push(<TodoItem key={item.id} item={item} />)
        });
        return (
            <div className="todo-list">
                <ul className="todo-list__list">
                    {todos}
                </ul>
                <button className="button todo-list__add" onClick={this._addItem}>Add</button>
            </div>
        );
    }
});

//  View for index page
const Index = React.createClass({
    render: function IndexRender () {
        return (
            <section id="todo-list">
                <h1>Todo List</h1>
                <TodoList />
            </section>
        );
    }
});

//  Bind UI generation to onLoad Trigger
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Index />, document.getElementById('body'));
});