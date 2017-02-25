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
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/development'
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
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/test'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/production'
        }
    }
};