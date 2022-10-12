const Post = require("../models/post");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
    Post.find().sort({
        _id: -1,
    })
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
    delete postObject._userId;
    const post = new Post({
        userId: postObject.userId,
        title: postObject.title,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        description: postObject.description,
        location: postObject.location,
        likes: "0",
        dislikes: "0",
        usersLiked: [],
        usersDisliked: []
    });
    post.save()
        .then(res.status(201).json({ message: "Post créé avec succès !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };
    if (postObject.imageUrl == null) {
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post modifiée !" }))
            .catch(error => res.status(400).json({ error }));
    } else {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                const filename = post.imageUrl.split("/images/")[1];

                fs.unlink(`images/${filename}`, () => {
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Image supprimé" }))
                        .catch(error => res.status(400).json({ error }));
                });
            });
    }
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: "Post supprimée !" }) })
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
    switch (req.body.like) {
        case 1:
            Post.updateOne({ _id: req.params.id }, {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: "Like ajouté !" }))
                .catch(error => res.status(500).json({ error }));
            break;

        case -1:
            Post.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId }
            })
                .then(() => res.status(201).json({ message: "Dislike ajouté !" }))
                .catch(error => res.status(500).json({ error }));
            break;

        case 0:
            Post.findOne({ _id: req.params.id })
                .then(post => {
                    if (post.usersLiked.includes(req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        })
                            .then(() => res.status(201).json({ message: "Like été retiré !" }))
                            .catch(error => res.status(500).json({ error }));
                    }

                    if (post.usersDisliked.includes(req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId }
                        })
                            .then(() => res.status(201).json({ message: "Dislike été retiré !" }))
                            .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(500).json({ error }));
            break;
    }
};