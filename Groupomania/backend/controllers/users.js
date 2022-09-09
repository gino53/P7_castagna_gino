const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = {
    register: function(req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user' });
                    });
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },
    login: function(req, res) {
        
    }
}