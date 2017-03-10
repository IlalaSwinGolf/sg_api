'use strict';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const TestHelper = require('../helpers/test');
const ErrorsLabels = require('../helpers/errors-labels');

const correctUser = {
    username: 'username_test',
    email: 'email_test',
    password: 'password_test',
    role_id: 1
};

const nonUniqueEmailUser = {
    username: 'username',
    email: 'email_test',
    password: 'password_test',
    role_id: 1
};

const nonUniqueUsernameUser = {
    username: 'username_test',
    email: 'email',
    password: 'password_test',
    role_id: 1
};


chai.use(chaiHttp);

describe('Authentication', function() {
    before(function(done) {
        TestHelper.migrate().then(TestHelper.truncate).then(TestHelper.seed).then(function() {
            done();
        });
    });

    after(function(done) {
        TestHelper.truncate().then(TestHelper.migrate).then(function() {
            done();
        });
    });

    describe('Signup', function() {

        it('should create a user', function(done) {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signup')
                .send(correctUser)
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('username');
                    res.body.data.username.should.equal('username_test');
                    res.body.data.should.have.property('email');
                    res.body.data.email.should.equal('email_test');
                    res.body.data.should.have.property('disabled');
                    res.body.data.disabled.should.equal(false);
                    res.body.data.should.have.property('role');
                    res.body.data.role.status.should.equal("root");
                    res.body.data.should.not.have.property('password');
                    res.body.data.should.not.have.property('role_id');
                    done();
                });
        });
        it('should failed to create an user because username is already used', function(done) {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signup')
                .send(nonUniqueUsernameUser)
                .end(function(err, res) {
                    res.should.have.status(422);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('type');
                    res.body.type.should.equal(ErrorsLabels.duplicateEntryError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(ErrorsLabels.nonUniqueUsername);
                    done();
                });
        });
        it('should failed to create an user because email is already used', function(done) {

            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signup')
                .send(nonUniqueEmailUser)
                .end(function(err, res) {
                    res.should.have.status(422);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('type');
                    res.body.type.should.equal(ErrorsLabels.duplicateEntryError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(ErrorsLabels.nonUniqueEmail);
                    done();
                });

        });

    });

    describe('Signin', function() {

        it('should send a JWT token', function(done) {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signin')
                .send({username: correctUser.username, password: correctUser.password})
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('token');
                    done();
                });
        });
        it('should send a 401 status with wrong password error', function(done) {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signin')
                .send({username: correctUser.username, password: "Wrong password"})
                .end(function(err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('type');
                    res.body.type.should.equal(ErrorsLabels.wrongPasswordError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(ErrorsLabels.wrongPassword);
                    done();
                });
        });
    });
});