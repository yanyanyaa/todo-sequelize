const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// page: detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// // page: new
// router.get('/todos/new', (req, res) => {
//   res.render('new')
// })

// // create
// router.post('/', (req, res) => {
//   const UserId = req.user.id
//   const name = req.body.name
//   return Todo.create({ name, UserId })
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err))
// })

// page: edit
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})

// update
router.put('/:id', (req, res) => {

})

// delete
router.delete('/:id', (req, res) => {

})

module.exports = router