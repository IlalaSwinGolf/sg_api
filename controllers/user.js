'use strict';

const userCollection = require('../collections/user');
const User = require('../models/user');

module.exports = {

    fetchAll: (req, res, next) => {
        userCollection.forge()
            .fetch({withRelated: ['role']})
            .then(function(collection) {
                res.status(200).json({
                    "error": false,
                    data: collection
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    "error": true,
                    "message": err.message
                });
            });
    },
    fetchOne: (req, res, next) => {
        User.forge({id: req.params.id})
            .fetch({withRelated: ['role']})
            .then(function(user) {
                res.status(200).json({
                    "error": false,
                    data: user
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    "error": true,
                    "message": err.message
                });
            });
    },

    forbidden: (req, res, next) => {
        res.status(403).json({
            "error": true,
            "message": req.method + " is not allowed with " + req.url + " url"
        });
    }
}