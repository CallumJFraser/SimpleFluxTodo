const React = require('react');
const ReactDOM = require('react-dom');
const TodoList = require('./components/todoList');

const Index = React.createClass({
    render: function IndexRender () {
        return (
            <div className="row">
                <TodoList />
            </div>
        );
    }
});

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Index />, document.getElementById('body'));
});