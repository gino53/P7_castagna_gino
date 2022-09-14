const express = require('express');
const users = require('../controllers/users');

exports.router = (function() {
    const apiRouter = express.Router();

    apiRouter.route('/users/register/').post(users.register);
    apiRouter.route('/users/login/').post(users.login);

    return apiRouter;
})();