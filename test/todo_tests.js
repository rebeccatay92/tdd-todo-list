const assert = require('assert')
const todos = require('../controllers/todos_controller.js')


// // Use Assert to Test the functionality of all your CRUD methods e.g.

// normal case: creating new todos
// params must contain name property
// name must be at least 5 chars
// if only name property is present, sensible defaults for description and completed
// params contains uuid
console.log('Testing create()')
var test = {
  name: 'First Todo',
  description: 'First description',
  completed: false
}
todos.create(test)
assert.strictEqual(test.name.length > 5, true, "Name needs to be at least 5 chars long")
assert.strictEqual(test.hasOwnProperty('description'), true, "Each todo needs to have a description")
assert.strictEqual(test.hasOwnProperty('completed'), true, "Each todo needs to have a completed property")
assert.strictEqual(test.hasOwnProperty('_id'), true, "Each todo needs to have a unique _id")

//normal: list() should return an array of todo objects
console.log('Testing list()')
var todoList = todos.list()
assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')

//normal: show(id) should return the object with matching _id
console.log('Testing show(id)')
var testId = test._id //takes id from test object
var found = todos.show(testId)
assert.strictEqual(found._id,testId, "_id of returned object needs to match needed id")
