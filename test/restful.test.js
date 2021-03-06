// node >= 6.0.0

var request = require('supertest');
var assert = require('assert');

var YNode = require('../index.js');

var app = new YNode({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,
    'useRestful': true
});
var server = app.getServer();

// api
YNode.WebRestful.get('/abc', function(req, res){
    res.end('get ok');
});
YNode.WebRestful.get('/abc/{id:\\d+}', function(req, res, id){
    res.end(String(id));
});
YNode.WebRestful.post('/def', function(req, res){
    res.end('post ok');
});
YNode.WebRestful.get('/xyz', 'app/api/Demo@index');

// test restful api
describe('RESTful api', function() {
    it('simple get', function(done) {
        request(server)
            .get('/abc')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'get ok');
                
                done();
            });
    });
    
    it('get with param', function(done) {
        request(server)
            .get('/abc/123')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, '123');
                
                done();
            });
    });
    
    it('simple post', function(done) {
        request(server)
            .post('/def')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'post ok');
                
                done();
            });
    });
    
    it('simple class get', function(done) {
        request(server)
            .get('/xyz')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'restful class ok');
                
                done();
            });
    });
    
});
