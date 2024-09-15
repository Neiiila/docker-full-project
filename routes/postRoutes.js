const express = require('express')

const postController = require('../controllers/postController')

const protect = require('../middlewares/userMiddleware') 

const router = express.Router()

router.route('/')
    .get( protect, postController.getAllPosts) // for the get method
    .post( protect, postController.postPost) // for the post method

router.route('/:id')
    .get( protect, postController.getPostById)
    .patch( protect, postController.updatePost)
    .delete( protect, postController.deletePost)

module.exports = router