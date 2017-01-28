require('chai').should();
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TodoList = require('../../src/components/todoList');
const Dispatcher = require('../../src/dispatcher');

describe('TodoList', function () {
	function renderComponent () {
		const component = TestUtils.renderIntoDocument(<TodoList />);
		return ReactDOM.findDOMNode(component);
	};

	it('should render with filled name input and remove button', function () {
		const todoList = renderComponent();

		const title = todoList.querySelectorAll('h1')[0];
		title.textContent.should.equal('Simple Flux Todo');
	});

	it('should send a "TODO_CREATE" payload to the dispatcher when remove button clicked', function (done) {
		var todoList = renderComponent();
		const removeButton = todoList.querySelectorAll('.btn-add')[0];

		var dispatcherId = Dispatcher.subscribe(function (payload) {
			payload.action.should.equal('TODO_CREATE');
			done();
		});

		TestUtils.Simulate.click(removeButton);
		Dispatcher.unsubscribe(dispatcherId);
	});
});
