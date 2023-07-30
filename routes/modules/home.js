const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      // if (!user)
      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: user.id }
      })
    })
    .then((todos) => { return res.render('index', { todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
