const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postsController');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

router.route('/:id/comments')
  .post(addComment);

module.exports = router;