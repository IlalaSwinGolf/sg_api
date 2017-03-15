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

const correctUser = {
    username: 'username_test',
    email: 'email_test',
    password: 'password_test',
};

const nonUniqueEmailUser = {
    username: 'username',
    email: 'email_test',
    password: 'password_test',
};

const nonUniqueUsernameUser = {
    username: 'username_test',
    email: 'email',
    password: 'password_test',
};

const nonDisabledUser = {
    username: 'non_disabled_user',
    email: 'non_disabled_user',
    password: 'password_test',
    disabled: false
};

const badAuthorityUser = {
    username: 'non_disabled_user',
    email: 'non_disabled_user',
    password: 'password_test',
    role_id: 1
};


chai.use(chaiHttp);

describe('Authentication', function() {
    before(function(done) {
        DBHelper.migrate().then(DBHelper.truncate).then(DBHelper.seed).then(function() {
            done();
        });
    });

    after(function(done) {
        DBHelper.truncate().then(function() {
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
                    res.body.data.disabled.should.equal(true);
                    res.body.data.should.have.property('role');
                    res.body.data.role.should.have.property('authority');
                    res.body.data.role.authority.should.equal("user");
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
                    res.body.should.have.property('error');
                    res.body.error.should.equal(CustomErrors.types.duplicateEntryError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(CustomErrors.messages.nonUniqueUsername);
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
                    res.body.should.have.property('error');
                    res.body.error.should.equal(CustomErrors.types.duplicateEntryError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(CustomErrors.messages.nonUniqueEmail);
                    done();
                });

        });
        it('should failed to create an user because disabled property is set', function(done) {

            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signup')
                .send(nonDisabledUser)
                .end(function(err, res) {
                    res.should.have.status(403);
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
            it('should failed to create an user because role_id property is set', function(done) {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signup')
                .send(badAuthorityUser)
                .end(function(err, res) {
                    res.should.have.status(403);
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

    describe('Signin', function() {

        it('should send a JWT token', function(done) {
            chai.request(server)
                .post('/api/' + APIVersion + '/auth/signin')
                .send({
                    username: correctUser.username,
                    password: correctUser.password
                })
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
                .send({
                    username: correctUser.username,
                    password: "Wrong password"
                })
                .end(function(err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('error');
                    res.body.error.should.equal(CustomErrors.types.authenticationError);
                    res.body.should.have.property('message');
                    res.body.message.should.equal(CustomErrors.messages.wrongPassword);
                    done();
                });
        });
    });
});