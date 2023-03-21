const express = require('express');
const router = express.Router();

const userRoutes = require('./api/user');
router.use('/api/users', userRoutes);

const postRoutes = require('./api/post');
router.use('/api/posts', postRoutes);

const frontendRoutes = require('./frontend');
router.use('/', frontendRoutes);

module.exports = router;