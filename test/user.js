'use strict';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const DBHelper = require('../helpers/db');
const CustomErrors = require('../helpers/custom-errors');

chai.use(chaiHttp);

describe('Fetch user', function() {

    beforeEach(function(done) {
        DBHelper.migrate().then(DBHelper.truncate).then(DBHelper.seed).then(function() {
            done();
        });
    });

    afterEach(function(done) {
        DBHelper.truncate().then(function() {
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
                res.body.data.email.should.equal('flocateur@gmail.com');
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

describe('Update properties - success', function() {
    let token = null;

    before(function(done) {
        DBHelper.migrate().then(DBHelper.truncate).then(DBHelper.seed).then(function() {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signin')
                .send({
                    username: 'flocateur',
                    password: 'pwd'
                })
                .end(function(err, res) {
                    token = res.body.token;
                    done();
                });
        });
    });

    after(function(done) {
        DBHelper.truncate().then(DBHelper.migrate).then(function() {
            done();
        });
    });
    it('should update username', function(done) {;
        chai.request(server)
            .put('/api/' + APIVersion + '/users/1')
            .set('Authorization', token)
            .send({
                username: 'foo'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.id.should.equal(1);
                res.body.data.should.have.property('username');
                res.body.data.username.should.equal('foo');
                res.body.data.should.have.property('updated_at');
                done();
            });
    });
});
describe('Update properties - fail - Authentication error', function() {

    it('should failed because user is not logged in', function(done) {
        chai.request(server)
            .put('/api/' + APIVersion + '/users/1')
            .send({
                role_id: 1
            })
            .end(function(err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('error');
                res.body.error.should.equal(CustomErrors.types.authenticationError);
                res.body.should.have.property('message');
                done();
            });
    });
});
describe('Update properties - fail - Use case', function() {

    let token = null;
    before(function(done) {
        DBHelper.migrate().then(DBHelper.truncate).then(DBHelper.seed).then(function() {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signin')
                .send({
                    username: 'carlito',
                    password: 'pwd'
                })
                .end(function(err, res) {
                    token = res.body.token;
                    done();
                });
        });
    });

    after(function(done) {
        DBHelper.truncate().then(DBHelper.migrate).then(function() {
            done();
        });
    });
    describe('Update properties - fail - unsufficient authority', function() {
        it('should failed to update role_id property', function(done) {
            chai.request(server)
                .put('/api/' + APIVersion + '/users/3')
                .set('Authorization', token)
                .send({
                    role_id: 1
                })
                .end(function(err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('error');
                    res.body.error.should.equal(CustomErrors.types.forbiddenActionError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(CustomErrors.messages.tooLowAuthority);
                    done();
                });
        });
        it('should failed to update disabled property', function(done) {
            chai.request(server)
                .put('/api/' + APIVersion + '/users/3')
                .set('Authorization', token)
                .send({
                    disabled: false
                })
                .end(function(err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('error');
                    res.body.error.should.equal(CustomErrors.types.forbiddenActionError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(CustomErrors.messages.tooLowAuthority);
                    done();
                });
        });
    });
});