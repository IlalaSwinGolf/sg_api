'use strict';

const roleCollection = require('../collections/role');
const Role = require('../models/role');

module.exports = {

    fetchAll: (req, res, next) => {
        Role.findAll(req.query, {})
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
    forbidden: (req, res, next) => {
        res.status(405).json({
            "error": true,
            "message": req.method + " is not allowed with " + req.url + " url"
        });
    }
}