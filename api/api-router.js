const express = require('express');
const blogsRouter = require('../blogs/blogs-router.js');

const router = express.Router();

// This router handles requests that begin with /api

// Drills down to blogs
router.use('/blogs', blogsRouter);

module.exports = router;