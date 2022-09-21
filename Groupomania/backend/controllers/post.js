const Post = require("../models/post");

exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getPostById = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        title: postObject.title,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        description: postObject.description,
        location: postObject.location,
        likes: "0",
        dislikes: "0",
        usersLiked: [],
        usersDislikes: []
    });
    post.save()
        .then(res.status(201).json({ message: "Post créé avec succès !" }))
        .catch(error => res.status(400).json({ error }));
};