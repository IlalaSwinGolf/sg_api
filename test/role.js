'use strict';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const TestHelper = require('../helpers/test');

chai.use(chaiHttp);

describe('Roles routes', function() {
    beforeEach(function(done) {
        TestHelper.migrate().then(TestHelper.truncate).then(TestHelper.seed).then(function(){ done();});
    });

    afterEach(function(done) {
        TestHelper.truncate().then(TestHelper.migrate).then(function(){ done();});
    });


    it('should return a 405 HTTP response on get', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/roles')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(4);
                done();
            });
    });
    it('should return a 405 HTTP response on post', function(done) {
        chai.request(server)
            .post('/api/' + APIVersion + '/roles')
            .end(function(err, res) {
                res.should.have.status(405);
                done();
            });
    });
    it('should return a 405 HTTP response on put', function(done) {
        chai.request(server)
            .put('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(405);
                done();
            });
    });
    it('should return a 405 HTTP response on delete', function(done) {
        chai.request(server)
            .delete('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(405);
                done();
            });
    });
    it('should return a 405 HTTP response on get single role', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/roles/1')
            .end(function(err, res) {
                res.should.have.status(405);
                done();
            });
    });
});