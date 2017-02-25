process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const APIVersion =  require ('../api_version')();



chai.use(chaiHttp);

describe('API Routes', function() {
 it('should return all roles', function(done) {
    chai.request(server)
    .get('/api/' + APIVersion + '/roles')
    .end(function(err, res) {
    console.log(res.body.data);
    res.should.have.status(200);
    res.should.be.json;
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(4);
    res.body.data[0].should.have.property('status');
    done();
    });
  });

});
