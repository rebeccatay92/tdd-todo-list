const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.

// normal case: creating new todos
// params must contain name property
// name must be at least 5 chars
// if only name property is present, sensible defaults for description and completed
// params contains uuid
console.log('Testing create(params)')
var test = {
  name: 'First Todo',
  description: 'First description',
  completed: false
}
todos.create(test)
assert.strictEqual(test.name.length > 5, true, 'Name needs to be at least 5 chars long')
assert.strictEqual(test.hasOwnProperty('description'), true, 'Each todo needs to have a description')
assert.strictEqual(test.hasOwnProperty('completed'), true, 'Each todo needs to have a completed property')
assert.strictEqual(test.hasOwnProperty('_id'), true, 'Each todo needs to have a unique _id')

// normal: list() should return an array of todo objects
console.log('Testing list()')
var todoList = todos.list()
assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')

// normal: show(id) should return the object with matching _id
console.log('Testing show(id)')
var testId = test._id // takes id from test object
var found = todos.show(testId)
assert.strictEqual(found._id, testId, '_id of returned object needs to match needed id')

// normal: update(id, params) should change name, description, completed depending on updatedParams object
// name should be at least 5 chars
// returns true if successful, false otherwise
console.log('Testing update(id, params)')
var newParams = {
  name: 'Banana',
  description: 'Eat banana',
  completed: true
}
//reuse testId to update test todo object
var updateOutput = todos.update(testId, newParams)
assert.ok(updateOutput, "Needs to return true if conditions are met")

// normal: destroy(id) should remove the todo object from todos array
// return true if successful, false otherwise
console.log('Testing destroy(id)')
var test2 = {
  name: 'apple'
}
var test3 = {
  name: 'avocado'
}
todos.create(test2)
todos.create(test3)
//create 2 more objects. total should be 3 now
var test2Id = test2._id
var test3Id = test3._id

var destroyOutput = todos.destroy(test3Id)
assert.strictEqual(todos.list().length, 2, "After destroying avocado, only banana and apple should be left")
assert.ok(destroyOutput, "destroy should return true if todo has been deleted")

//normal: destroyAll() should delete all Todos and return true
console.log('Testing destroyAll()')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, "Deleting everything should leave an empty array")
