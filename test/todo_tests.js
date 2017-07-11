const assert = require('assert')
const todos = require('../controllers/todos_controller.js')


// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var test = {
  name: 'First Todo',
  description: 'First description',
  completed: false
}

// normal case: creating new todos
// params must contain name property
// name must be at least 5 chars
// if only name property is present, sensible defaults for description and completed
// params contains uuid
console.log('Testing create()')
todos.create(test)
assert.strictEqual(test.name.length > 5, true, "Name needs to be at least 5 chars long")
assert.strictEqual(test.hasOwnProperty('description'), true, "Each todo needs to have a description")
assert.strictEqual(test.hasOwnProperty('completed'), true, "Each todo needs to have a completed property")
assert.strictEqual(test.hasOwnProperty('_id'), true, "Each todo needs to have a unique _id")

// var firstToDo = todos.list()[0]
// assert.strictEqual(todos.list().length, 1, "List should return an array of all todos")
