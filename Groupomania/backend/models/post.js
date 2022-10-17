const mongoose = require("mongoose");

const postSchema = mongoose.Schema({

    userId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }]

});

module.exports = mongoose.model("Post", postSchema);