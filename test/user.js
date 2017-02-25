process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);


chai.use(chaiHttp);
beforeEach(function(done) {
    knex.migrate.rollback()
        .then(function() {
            knex.migrate.latest()
                .then(function() {
                    return knex.seed.run()
                        .then(function() {
                            done();
                        });
                });
        });
});

afterEach(function(done) {
    knex.migrate.rollback()
        .then(function() {
            done();
        });
});

describe('User routes', function() {
    it('should return all users', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(4);
                done();
            });
    });

});

describe('User consistency', function() {
    it('should return meta-informations', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.data.should.have.property('role')
                done();
            });
    });
});