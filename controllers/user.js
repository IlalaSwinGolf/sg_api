'use strict';

const userCollection = require('../collections/user');
const User = require('../models/user');

module.exports = {

    fetchAll: (req, res, next) => {
        User.findAll(req.query, {
                withRelated: ['role']
            })
            .then(function(collection) {
                res.status(200).json({
                    "error": false,
                    "data": collection
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    "error": true,
                    "message": err.message
                });
            });
    },
    fetch: (req, res, next) => {
        User.findOne({
                id: req.params.id
            }, {
                withRelated: ['role']
            })
            .then(function(user) {
                res.status(200).json({
                    "error": false,
                    "data": user
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    "error": true,
                    "message": err.message
                });
            });
    },
    create: (req, res, next) => {
        User.create(req.body, {})
            .then(function(savedUser) {
                User.findOne({
                        id: savedUser.id
                    }, {
                        withRelated: ['role']
                    })
                    .then(function(user) {
                        res.status(201).json({
                            "error": false,
                            "data": user
                        });
                    })

            })
            .catch(function(err) {
                res.status(500).json({
                    "error": true,
                    "data": {
                        "message": err.message
                    }
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