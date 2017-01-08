require('chai').should();
const todoStore = require('../../src/stores/todo');

describe('Todo store', function () {
	const createAction = 'TODO_CREATE';
	const removeAction = 'TODO_REMOVE';
	const updateAction = 'TODO_UPDATE';
	var rollback;

	beforeEach(function () {
		rollback = todoStore.__set__('_todos', []);
	});

	afterEach(function () {
		if (rollback) {
			rollback();
			rollback = undefined;
		}
	});

	it('should return current list of todos',function () {
		rollback = todoStore.__set__('_todos', [{
			id: 12345,
			text: '0one2three4five6seven8nine'
		}]);

		var todos = todoStore.getTodos();
		todos[0].id.should.equal(12345);
		todos[0].text.should.equal('0one2three4five6seven8nine');

		rollback = todoStore.__set__('_todos', [{
			id: 54321,
			text: '9eight7six5four3two1zero'
		}]);

		todos = todoStore.getTodos();
		todos[0].id.should.equal(54321);
		todos[0].text.should.equal('9eight7six5four3two1zero');
	});

	it('should handle todo create action', function () {
		const handleDispatch = todoStore.__get__('handleDispatch');

		handleDispatch({
			action: createAction,
			data: {
				text: 'testing this shizzle'
			}
		});

		const todos = todoStore.__get__('_todos');
		todos[0].text.should.equal('testing this shizzle');
	});

	it('should handle todo remove action', function () {
		const handleDispatch = todoStore.__get__('handleDispatch');
		rollback = todoStore.__set__('_todos', [{
			id:1,
			text: 'this is a test'
		}]);

		handleDispatch({
			action: removeAction,
			data: 1
		});

		const todos = todoStore.__get__('_todos');
		todos.length.should.equal(0);
	});

	it('should handle todo update action', function () {
		const handleDispatch = todoStore.__get__('handleDispatch');
		rollback = todoStore.__set__('_todos', [{
			id:1,
			text: 'this is a test'
		}]);

		handleDispatch({
			action: updateAction,
			data: {
				id: 1,
				text: 'updated text'
			}
		});

		const todos = todoStore.__get__('_todos');
		todos[0].text.should.equal('updated text');
	});
});
