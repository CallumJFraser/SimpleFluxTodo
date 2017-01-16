require('chai').should();
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TodoList = require('../../src/components/todoList');

describe('TodoList', function () {
	const renderComponent = function () {
		const component = TestUtils.renderIntoDocument(<TodoList />);
		return ReactDOM.findDOMNode(component);
	};

	it('should render with filled name input and remove button', function () {
		const todoList = renderComponent();

		const title = todoList.querySelectorAll('h1')[0];
		title.textContent.should.equal('Simple Flux Todo');
	});
});
