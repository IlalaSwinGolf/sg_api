'use strict';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion = require('../api_version')();
const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const DBHelper = require('../helpers/db');

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

describe('Update its own properties', function() {
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
    it('should update username', function(done) {
        chai.request(server)
            .put('/api/' + APIVersion + '/users/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                username: 'fleprovost'
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
                res.body.data.username.should.equal('fleprovost');
                res.body.data.should.have.property('updated_at');
                done();
            });
    });
});