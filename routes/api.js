'use strict';
const bodyParser  = require('body-parser');
const mongoose = require('mongoose')
const Issue = require('../Issue');
const ObjectID = require('mongodb').ObjectID;

module.exports = async function (app) {
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const { project } = req.params;
      const query = req.query;
      query.project = project;
      Issue.find(query, (err, issues) => {
        if(err) {
          return res.send(err);
          }
        return res.send(issues);
      })
      
    })
    
    .post(function (req, res){
      const { project } = req.params;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      let newIssue = new Issue({ issue_title, issue_text, created_by, assigned_to, status_text, project })
      newIssue.save((err, issue) => {
        if(err){
            return res.send({ error: 'required field(s) missing' });
        }
        else if(issue){
          return res.send(issue);
        }
      });
      
    })
    
    .put(function (req, res) {
      const issue = req.body;
      if(!issue._id){
        return res.send({ error: 'missing _id' });
      }
      else if(!(issue.issue_text||issue.issue_title||issue.created_by)){
        return res.send({ error: 'no update field(s) sent', '_id': issue._id });
      }
      else {
        Issue.findByIdAndUpdate(issue._id, {$set: issue}, function(err, doc){
          if(err||!doc)res.send({ error: 'could not update', '_id': issue._id })
          else{
            res.send({ result: 'successfully updated', '_id': doc._id })
          }
          
        })
      }
    })

    
    .delete(function (req, res){
      const { _id } = req.body;
      if(!_id){
        return res.send({ error: 'missing _id' });
      } else {
        Issue.findByIdAndDelete(_id, (err, doc) => {
        if(err || !doc){ res.send({ error: "could not delete", _id })}
        else res.send({ result: "successfully deleted", _id })
        
      })
      }
      
      
    });
  

  //Sample front-end
  app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

  //Index page (static HTML)
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/views/index.html');
    });


};
