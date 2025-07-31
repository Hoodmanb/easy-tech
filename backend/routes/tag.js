const express = require('express');
const tagRouter = express.Router();
const tag = require('../controllers/tag');
const verifyToken = require("../middleware/verifyToken")

tagRouter.post('/', verifyToken, tag.createTag);

tagRouter.get('/', tag.getAllTags);

tagRouter.get('/:id', tag.getTagById);

tagRouter.put('/:id', verifyToken, tag.updateTag);

tagRouter.delete('/:id', verifyToken, tag.deleteTag);

module.exports = tagRouter;
