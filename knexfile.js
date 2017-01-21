'use strict';

module.exports = {

    development: {
        client: 'pg',
        connection: {
            database: 'sg_db',
            user: 'postgres',
            password: 'postgres',
            charset: 'utf8'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
    test: {
        client: 'pg',
        connection: {
            database: 'sg_db_test',
            user: 'postgres',
            password: 'postgres',
            charset: 'utf8'
        },
        migrations: {
            directory: './db/migrations'
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './db/migrations'
        }
    }
};