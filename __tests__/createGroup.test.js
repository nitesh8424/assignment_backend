const assert = require('assert');
const request = require('supertest');
const server = require('../server');

describe('POST /create-group', function () {
  it('should create a new group when valid data is provided', function (done) {
    const groupData = {
      "groupName": "butesg12",
      "username": "Acky",
      "members": [
        { "username": "abc123" }
      ]
    };

    request(server)
      .post('/api/user/create-group')
      .send(groupData)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.message, 'group successfully created');
        done();
      });
  });

  it('should return 409 status when group is already in use', function (done) {
    const existingGroupData = {
      "groupName": "butesg", 
      "username": "Acky",
      "members": [
        { "username": "abc123" }
      ]
    };

    request(server)
      .post('/api/user/create-group')
      .send(existingGroupData)
      .expect(409)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.body.success, false);
        assert.strictEqual(res.body.data.message, 'groupName is already in use.');
        done();
      });
  });
});