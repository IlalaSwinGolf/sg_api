process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);

const user = {
    login: 'login_test',
    email: 'email_test',
    password: 'password_test',
    role_id: 1
};

chai.use(chaiHttp);

describe('User routes', function() {
    before(function(done) {
        knex.migrate.rollback()
            .then(function() {
                knex.migrate.latest()
                    .then(function() {
                        return knex.seed.run()
                            .then(function() {
                                done();
                            });
                    });;
            });
    });

    after(function(done) {
        knex.migrate.rollback()
            .then(function() {
                done();
            });
    });

    it('should add an user', function(done) {
        chai.request(server)
            .post('/api/' + APIVersion + '/users')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.have.property('login');
                res.body.data.login.should.equal(user.login);
                res.body.data.should.have.property('email');
                res.body.data.email.should.equal(user.email);
                res.body.data.should.have.property('password');
                res.body.data.password.should.equal(user.password);
                res.body.data.should.have.property('disabled');
                res.body.data.disabled.should.equal(false);
                done();

            });
    });
    it('should return all users', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(1);
                done();
            });
    });
    it('should return users informations', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.data.should.have.property('login');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('password');
                res.body.data.should.have.property('disabled');
                done();
            });
    });
    it('should return meta informations', function(done) {
        chai.request(server)
            .get('/api/' + APIVersion + '/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.data.should.have.property('role');
                done();
            });
    });

});