const { Router } = require('express')
const config = require('config')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const { title, description } = req.body

    const post = new Post({
      title,
      description,
      athor: req.user.userId,
    })

    await post.save()

    res.status(201).json({ post })
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Во время регистрации что-то пошло не так' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
    res.json(posts)
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Во время регистрации что-то пошло не так' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
  } catch (e) {
    const posts = await Post.findById(req.params.id)
    res.json(posts)
    res
      .status(500)
      .json({ message: 'Во время регистрации что-то пошло не так' })
  }
})

module.exports = router
