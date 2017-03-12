'use strict';

const Role = require('../../../models/role');
const DBHelper = require('../../../helpers/db');
const User = require('../../../models/user');

exports.seed = function(knex, Promise) {
    return DBHelper.truncate()
        .then(function() {
            return Role.create({
                authority: 'root'
            }, {})
        })
        .then(function() {
            return Role.create({
                authority: 'admin'
            }, {})
        })
        .then(function() {
            return Role.create({
                authority: 'user'
            }, {})
        })
        .then(function() {
            return Role.create({
                authority: 'guest'
            }, {})
        })
        .then(function() {
            return User.create({
                role_id: 1,
                username: 'flocateur',
                email: 'flocateur@gmail.com',
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
        });
};