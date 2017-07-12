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

// normal: cannot create if name is undefined
var noNameParam = {
  description: 'no name',
  completed: false
}
var noName = todos.create(noNameParam)
assert.strictEqual(noName, false, 'Create should return false if name is undefined')

// normal: create should return false if name is not mroe than 5 chars
var shortNameParam = {
  name: 'ABC'
}
var shortName = todos.create(shortNameParam)
assert.strictEqual(shortName, false, 'Name needs to be at least 5 chars long')

/* -------------------------------------------------- */

// normal: list() should return an array of todo objects
console.log('Testing list()')
var todoList = todos.list()
assert.strictEqual(todos.list().length, 4, 'List should return an array of first, second, third, and 1 from save file')

/* -------------------------------------------------- */

// normal: show(id) should return the object with matching _id
console.log('Testing show(id)')
var testId = first._id // takes id from first to test with
var found = todos.show(testId)
assert.strictEqual(found._id, testId, '_id of returned object needs to match id of first todo')

/* -------------------------------------------------- */

console.log('Testing update(id, params)')

// normal: update should return false if non-existent/fake id is given
var fakeId = '1234-2343-1627-1616'
var fakeIdParams = {
  name: 'Fake id'
}
var fakeIdOutput = todos.update(fakeId, fakeIdParams)
assert.strictEqual(fakeIdOutput, false, 'update should return false if id is wrong')

// normal: update(id, params) should return false if name is less than 5 chars
var updateShortNameParams = {
  name: 'ABC',
  description: 'Blah blah blah',
  completed: true
}
var updateShortName = todos.update(testId, updateShortNameParams)
assert.strictEqual(updateShortName, false, 'update should return false if new name has less than 5 chars')

// normal: update should return true even if description and completed is not given
var updateNameOnlyParams = {
  name: 'Update Name Only'
}
var updateNameOnly = todos.update(testId, updateNameOnlyParams)
assert.ok(updateNameOnly, 'Needs to return true even if description and completed is missing')

// error: completed param is not boolean
var notBooleanParam = {
  name: 'Not a boolean',
  description: 'Blah blah blah',
  completed: 'This is not boolean'
}
var notBoolean = todos.update(testId, notBooleanParam)
assert.strictEqual(notBoolean, false, 'Update should return false if completed is not a boolean')

// normal:  updating should change the property values to the new version
var updateEverythingParams = {
  name: 'Banana',
  description: 'Eat this banana',
  completed: true
}
var updateEverything = todos.update(testId, updateEverythingParams)
assert.strictEqual(todos.show(testId).name, updateEverythingParams.name, 'Name needs to be updated')
assert.strictEqual(todos.show(testId).description, updateEverythingParams.description, 'Description needs to be updated')
assert.strictEqual(todos.show(testId).completed, updateEverythingParams.completed, 'Completed status needs to be updated')

/* -------------------------------------------------- */

console.log('Testing destroy(id)')
// normal: if to do has already been removed, it should not be found
todos.destroy(second._id)
var tryToFind = todos.show(second._id)
assert.strictEqual(tryToFind, undefined, 'The second todo should not be found')

// error: if id is fake or does not match, destroy should return false
var destroyFake = todos.destroy(fakeId)
assert.strictEqual(destroyFake, false, "Destroy should return false if given id is underfined or does not match")

/* -------------------------------------------------- */

//normal: destroyAll() should delete all Todos and return true
console.log('Testing destroyAll()')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'Deleting everything should leave an empty array')

/* -------------------------------------------------- */

//how to save to data.json?
//THIS VOODOO WORKS
// todos.save()
//dont destroyAll before save!
