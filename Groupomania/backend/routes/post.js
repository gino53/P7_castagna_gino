const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/posts", multer, postCtrl.getAllPost);
router.get("/posts/:id", multer, postCtrl.getPostById);
router.post("/posts", multer, postCtrl.createPost);

module.exports = router;