const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
suite('Write the following tests in tests/2_functional-tests.js:', function() {
  test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/get_issues_test_888743')
      .send({ issue_title: "Fix error in posting data", issue_text: "When we post data it has an error.", created_by: "Joe", assigned_to: "Joe", status_text: "In QA" })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'issue_title', 'Issue should contains issue_title');
        assert.property(res.body, 'issue_text', 'Issue should contains issue_text');
        assert.property(res.body, 'created_by', 'Issue should contains created_by');
        assert.property(res.body, 'assigned_to', 'Issue should contains assigned_to');
        assert.property(res.body, 'status_text', 'Issue should contains status_text');
        _idTest = res.body._id;
        done();
      })
  })

  test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/get_issues_test_888743')
      .send({ issue_title: "Fix error in posting data"})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing' );
        done();
      })
  })

  test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/get_issues_test_888743')
      .send({ issue_title: "Fix error in posting data"})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing' );
        done();
      })
  })

  test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
    chai.request(server)
      .post('/api/issues/get_issues_test_888743')
      .send({ issue_title: "Fix error in posting data"})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing' );
        done();
      })
  })  

  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/get_issues_test_888743')
      .query({})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'Issues should be an array');
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        done();
      })
  })
  test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/get_issues_test_888743')
      .query({ created_by: 'Alice' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'Issues should be an array');
        assert.equal(res.body[0].created_by, 'Alice');
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        done();
      })
  })

  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', (done) => {
    chai.request(server)
      .get('/api/issues/get_issues_test_888743')
      .query({ created_by: 'Alice', issue_title: 'To be Filtered' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'Issues should be an array');
        assert.property(res.body[0], 'issue_title');
        assert.equal(res.body[0].issue_title, 'To be Filtered');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.equal(res.body[0].created_by, 'Alice');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        done();
      })
  })

  test('Update one field on an issue: PUT request to /api/issues/{project}', (done) => {
    chai.request(server)
      .put('/api/issues/get_issues_test_888743')
      .send({ _id: _idTest, issue_text: 'This text is changed' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        done();
      })
  })



  
  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', (done) => {
    chai.request(server)
      .put('/api/issues/get_issues_test_888743')
      .send({ _id: _idTest, issue_text: 'This text is changed', issue_title: 'This title is changed too' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        done();
      })
  })

  test('Update an issue with missing _id: PUT request to /api/issues/{project}', (done) => {
    chai.request(server)
      .put('/api/issues/get_issues_test_888743')
      .send({ issue_text: 'This text is changed' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id' );
        done();
      })
  })

  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', (done) => {
    chai.request(server)
      .put('/api/issues/get_issues_test_888743')
      .send({ _id: _idTest })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'no update field(s) sent' );
        done();
      })
  })

  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', (done) => {
    chai.request(server)
      .put('/api/issues/get_issues_test_888743')
      .send({ _id: 'Whatever', issue_text: 'This text is changed' })
      .end(function(err, res) {
        console.log(res.body);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not update' );
        done();
      })
  })

  test('Delete an issue: DELETE request to /api/issues/{project}', (done) => {
      chai.request(server)
        .delete('/api/issues/get_issues_test_888743')
        .send({ _id: _idTest })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully deleted' );
          done();
        })
    })

  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', (done) => {
        chai.request(server)
          .delete('/api/issues/get_issues_test_888743')
          .send({ _id: 'Whatever' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'could not delete' );
            done();
          })
      })

  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', (done) => {
        chai.request(server)
          .delete('/api/issues/get_issues_test_888743')
          .send({})
          .end(function(err, res) {
            
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'missing _id' );
            done();
          })
      })
  
})