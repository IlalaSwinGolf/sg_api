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

describe('Fetch user', function() {

    beforeEach(function(done) {
        TestHelper.migrate().then(TestHelper.truncate).then(TestHelper.seed).then(function() {
            done();
        });
    });

    afterEach(function(done) {
        TestHelper.truncate().then(TestHelper.migrate).then(function() {
            done();
        });
    });
    it('should return all users', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(4);
                done();
            });
    });
    it('should return a user', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.id.should.equal(1);
                res.body.data.should.have.property('username');
                res.body.data.username.should.equal('flocateur');
                res.body.data.should.have.property('email');
                res.body.data.email.should.equal('fleprovost@gmail.com');
                res.body.data.should.have.property('disabled');
                res.body.data.disabled.should.equal(true);
                res.body.data.should.have.property('role');
                res.body.data.role.should.have.property('authority');
                res.body.data.role.authority.should.equal("root");
                res.body.data.should.not.have.property('password');
                res.body.data.should.not.have.property('role_id');
                done();
            });
    });
});