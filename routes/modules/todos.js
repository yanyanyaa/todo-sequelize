const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

// page: new
router.get('/new', (req, res) => {
  res.render('new')
})

// create
router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// page: detail
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// page: edit
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then(todo => res.render('edit', { todo: todo.get() }))
    .catch(error => console.log(error))
})

// update
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ 
    where: { UserId, id }
  })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))

})

// delete
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } } )
    .then(todo => todo.destroy()
    .then(() => {res.redirect('/')}))
    .catch(err => console.log(err))
  })

module.exports = router