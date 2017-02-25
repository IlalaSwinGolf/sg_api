'use strict';

const roleCollection = require('../collections/role');
const Role = require('../models/role');

module.exports = {

    getRoles: (req, res, next) => {
        roleCollection.forge()
            .fetch()
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
    // findById: (req, res, next) => {
    //     Role.forge({id: req.params.id})
    //         .fetch()
    //         .then(function(role) {
    //             res.status(200).json({
    //                 "error": false,
    //                 data: role
    //             });
    //         })
    //         .catch(function(err) {
    //             res.status(500).json({
    //                 "error": true,
    //                 "message": err.message
    //             });
    //         });
    // },

    forbidden: (req, res, next) => {
        res.status(403).json({
            "error": true,
            "message": req.method + " is not allowed with " + req.url + " url"
        });
    }
}