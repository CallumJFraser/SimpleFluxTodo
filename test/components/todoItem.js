require('chai').should();
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const TodoItem = require('../../src/components/todoItem');

describe('TodoItem', function () {
	const testItem = {
		id: 1,
		text: 'temp'
	};
	const renderComponent = function () {
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
});
