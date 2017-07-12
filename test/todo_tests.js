const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.

/* -------------------------------------------------- */
// normal case: creating new todos
console.log('Testing create(params)')
var firstParams = {
  name: 'First Todo',
  description: 'First description',
  completed: false
}

var first = todos.create(firstParams)
// name must be at least 5 chars
assert.strictEqual(first.name.length > 5, true, 'Name needs to be at least 5 chars long')
// normal: todo has 3 properties
assert.ok(first.hasOwnProperty('description'), 'Each todo needs to have a description')
assert.ok(first.hasOwnProperty('completed'), 'Each todo needs to have property called completed')
assert.ok(first.hasOwnProperty('_id'), 'Each todo needs to have an _id property')

// normal: todos need to have unique ids. 1st and 2nd todo's id need to be different
var secondParams = {
  name: 'Second Todo',
  description: 'Second description',
  completed: false
}
var second = todos.create(secondParams)
assert.notStrictEqual(first._id, second._id, 'The two todos cannot have the same uuid')

// normal: if only name property is present, sensible defaults for description and completed
var thirdParams = {
  name: 'Third Todo'
}
var third = todos.create(thirdParams)
assert.ok(third.hasOwnProperty('description'), 'If only name is given, there should be a default description')
assert.ok(third.hasOwnProperty('completed'), 'If only name is given, there should be a default completed status')

/* -------------------------------------------------- */

// normal: list() should return an array of todo objects
// console.log('Testing list()')
// var todoList = todos.list()
// assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')
//
// // normal: show(id) should return the object with matching _id
// console.log('Testing show(id)')
// var testId = test._id // takes id from test object
// var found = todos.show(testId)
// assert.strictEqual(found._id, testId, '_id of returned object needs to match needed id')
//
// // normal: update(id, params) should change name, description, completed depending on updatedParams object
// // name should be at least 5 chars
// // returns true if successful, false otherwise
// console.log('Testing update(id, params)')
// var newParams = {
//   name: 'Banana',
//   description: 'Eat banana',
//   completed: true
// }
// // reuse testId to update test todo object
// var updateOutput = todos.update(testId, newParams)
// assert.ok(updateOutput, 'Needs to return true if conditions are met')
//
// // normal: destroy(id) should remove the todo object from todos array
// // return true if successful, false otherwise
// console.log('Testing destroy(id)')
// var test2 = {
//   name: 'apple'
// }
// var test3 = {
//   name: 'avocado'
// }
// todos.create(test2)
// todos.create(test3)
// // create 2 more objects. total should be 3 now
// var test3Id = test3._id
//
// var destroyOutput = todos.destroy(test3Id)
// assert.strictEqual(todos.list().length, 2, 'After destroying avocado, only banana and apple should be left')
// assert.ok(destroyOutput, 'destroy should return true if todo has been deleted')
//
// // normal: destroyAll() should delete all Todos and return true
// console.log('Testing destroyAll()')
// todos.destroyAll()
// assert.strictEqual(todos.list().length, 0, 'Deleting everything should leave an empty array')
