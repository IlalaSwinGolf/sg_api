'use strict';

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "secret",
    saltRounds: process.env.JWT_SALT_ROUNDS || 10
};