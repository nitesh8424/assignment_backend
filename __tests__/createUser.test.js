const assert = require('assert');
const request = require('supertest');
const server = require('../server'); 

describe('POST /create-user', function() {
  it('should create a new user when valid data is provided', function(done) {
    const userData = {
      username: 'admin1233',
      password: 'Admin@123',
      mobileNumber: '1234567890',
      email: 'admin@admin.com'
    };

    request(server)
      .post('/api/admin/create-user')
      .send(userData)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.message, 'User successfully created');
        assert.strictEqual(res.body.data.username, userData.username);
        // Add more assertions as needed
        done();
      });
  });

  it('should return 409 status when username is already in use', function(done) {
    const existingUserData = {
      username: 'acky',
      password: 'acky',
      mobileNumber: '1234567890',
      email: 'acky@gmail.com'
    };

    request(server)
      .post('/api/admin/create-user')
      .send(existingUserData)
      .expect(409)
      .end(function(err, res) {
        console.log('response'. res)
        if (err) return done('err',err);
        assert.strictEqual(res.body.success, false);
        assert.strictEqual(res.body.data.message, 'username is already in use.');
        done();
      });
  });
});
