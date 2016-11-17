const Dispatcher = require('./dispatcher');
const TodoStore = require('./stores/todo');
const change = 'newesttrue';
const TodoList = require('./components/todolist');

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

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Index />, document.getElementById('body'));
});