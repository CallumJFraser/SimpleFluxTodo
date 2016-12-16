const Dispatcher = require('../dispatcher')

module.exports = React.createClass({
    _onChange: function (event) {
        var eventData = {
            id: this.props.item.id,
            text: event.target.value
        };

        Dispatcher.publish({
            action: 'TODO_UPDATE',
            data: eventData
        });
    },
    _removeItem: function () {
        Dispatcher.publish({
            action: 'TODO_REMOVE',
            data: this.props.item.id
        })
    },
    render: function TotoItemRender () {
        return (
            <li key={this.props.item.id}>
                <form>
                    <div className="row">
                        <div className="col-xs-8 col-sm-10">
                            <textarea className="form-control" name="text" value={this.props.item.text} onChange={this._onChange}></textarea>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={this._removeItem}>Remove</button>
                        </div>
                    </div>
                </form>
            </li>
        );
    }
});