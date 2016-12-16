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
        var taskId = TodoStore.subscribe(payload => {
            if (payload.action === 'UPDATE') {
                this._onChange();
            }
        });
        this.setState({
            taskId
        })
    },
    componentWillUnmount: function () {
        TodoStore.unsubscribe(this.state.taskId);
    },
    _addItem: () => {
        Dispatcher.publish({
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
            <div className="col-sm-12">
                <h1>Simple Flux Todo</h1>
                <ul>
                    {todos}
                </ul>
                <button type="button" className="btn btn-primary" onClick={this._addItem}>Add</button>
            </div>
        );
    }
});