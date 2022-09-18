const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/", multer, postCtrl.getAllPost);
router.get("/:id", multer, postCtrl.getPostById);
router.post("/", multer, postCtrl.createPost);

module.exports = router;