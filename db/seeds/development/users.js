'use strict';

const User = require('../../../models/user');

exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function() {
            return User.create({
                role_id: 1,
                username: 'flocateur',
                email: 'fleprovost@gmail.com',
                password: 'pwd'
            }, {})
        })
        .then(function() {
            return User.create({
                role_id: 2,
                username: 'amaujito',
                email: 'amaujito@gmail.com',
                password: 'pwd'
            }, {})
        })
        .then(function() {
            return User.create({
                role_id: 3,
                username: 'carlito',
                email: 'carlito@gmail.com',
                password: 'pwd'
            }, {})
        })
        .then(function() {
            return User.create({
                role_id: 4,
                username: 'maryam',
                email: 'maryam@gmail.com',
                password: 'pwd'
            }, {})
        })
};