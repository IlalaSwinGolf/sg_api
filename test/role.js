process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);


chai.use(chaiHttp);

describe('Roles routes', function() {
    before(function(done) {
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

    after(function(done) {
        knex.migrate.rollback()
            .then(function() {
                done();
            });
    });


    it('should return all roles', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/roles')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(4);
                res.body.data[0].should.have.property('status');
                done();
            });
    });
    it('should return a 403 HTTP response on post', function(done) {
        chai.request(server)
            .post('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(403);
                done();
            });
    });
    it('should return a 403 HTTP response on put', function(done) {
        chai.request(server)
            .put('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(403);
                done();
            });
    });
    it('should return a 403 HTTP response on delete', function(done) {
        chai.request(server)
            .delete('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(403);
                done();
            });
    });
    it('should return a 403 HTTP response on get single role', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(403);
                done();
            });
    });
});