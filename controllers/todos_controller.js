const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (!params.hasOwnProperty('description')) {
    params.description = 'Need to do ' + params.name
  }
  if (!params.hasOwnProperty('completed')) {
    params.completed = false
  }

  params._id = uuidGenerator()
  todos.push(params)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos // currently an empty array of length 0
}

function show (id) {
  // find the TODO with this id
  var index = todos.findIndex(function(el) {
    return el._id === id
  })
    return todos[index]
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var targetToChange = show(id)
  if (params.hasOwnProperty('description')) {
    targetToChange.description = params.description
  }
  if (params.hasOwnProperty('completed')) {
    targetToChange.completed = params.completed
  }
  if (params.name.length > 5) {
    targetToChange.name = params.name
  } else return false
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var targetToDestroy = show(id)
  if (targetToDestroy) { //check if such object exist
    todos.splice(todos.indexOf(targetToDestroy), 1)
    return true
  } else return false
}

function destroyAll() {
  while (todos.length > 0) {
    todos.pop()
  }
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
