const Dispatcher = require('../dispatcher')
const TodoStore = require('../stores/todo');

module.exports = React.createClass({
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