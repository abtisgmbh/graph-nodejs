/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

var fetch = require('../fetch');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/bookingBusinesses',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch('https://graph.microsoft.com/v1.0/solutions/bookingBusinesses', req.session.accessToken);
            res.render('bookingBusinesses', { bookingBusinesses: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;