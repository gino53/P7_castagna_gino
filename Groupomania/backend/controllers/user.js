const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "Création de l'utilisateur réussie !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ error: "Mot de passe incorrect !" });
                        } else {
                            const token = jwt.sign(
                                { userId: user._id, isAdmin: user.isAdmin },
                                process.env.JWT_SECRET,
                                { expiresIn: "24h" }
                            );
                            res.header('Authorization', 'Bearer' + token);
                            return res.json({ token, userId: user._id, isAdmin: user.isAdmin })
                        }
                    });
            }
        })
        .catch(error => res.status(500).json({ error }));
};