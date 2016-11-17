const Dispatcher = require('../dispatcher');
const TodoStore = require('../stores/todo');

const TodoItem = require('./todoitem');

module.exports = React.createClass({
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