const express = require('express');
const postsRouter = require('../posts/posts-router.js');

const router = express.Router();

// This router handles requests that begin with /api

// Drills down to blogs
router.use('/posts', postsRouter);

module.exports = router;