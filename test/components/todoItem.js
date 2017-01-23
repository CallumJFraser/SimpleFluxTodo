require('chai').should();
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TodoItem = require('../../src/components/todoItem');
const Dispatcher = require('../../src/dispatcher');

describe('TodoItem', function () {
	const testItem = {
		id: 1,
		text: 'temp'
	};

	function renderComponent () {
		const component = TestUtils.renderIntoDocument(<TodoItem item={testItem} />);
		return ReactDOM.findDOMNode(component);
	};

	it('should render with filled name input and remove button', function () {
		const todoItem = renderComponent();
		const nameInput = todoItem.querySelectorAll('textarea')[0];
		const removeButton = todoItem.querySelectorAll('button');

		nameInput.textContent.should.equal('temp');
		removeButton.length.should.equal(1);
		removeButton[0].textContent.should.equal('Remove');
	});

	it('should send a "TODO_REMOVE" payload to the dispatcher when remove button clicked', function (done) {
		var todoItem = renderComponent();
		const removeButton = todoItem.querySelectorAll('button')[0];

		var dispatcherId = Dispatcher.subscribe(function (payload) {
			payload.action.should.equal('TODO_REMOVE');
			payload.data.should.equal(1);
			done();
		});

		TestUtils.Simulate.click(removeButton);
		Dispatcher.unsubscribe(dispatcherId);
	});
});
