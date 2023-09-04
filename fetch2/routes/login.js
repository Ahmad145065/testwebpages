var express = require('express');
var router = express.Router();
var db = require('../db');
var helpers = require('../helpers');
var errors = [];

router.get('/', helpers.loginChecker, function (req, res, next) {
  res.render('login');
});

router.post('/', function (req, res, next) {

  if (!helpers.checkForm([req.body.email, req.body.password])) {
    errors.push('Please fill in all fields!');
    res.render('login', {errors: errors});
    errors = [];
    return;
  }

  if (!helpers.validateEmail(req.body.email)) {
    errors.push('Please enter a valid email address!');
    res.render('login', {errors: errors});
    errors = [];
    return;
  }

  var sqlQuery = `SELECT * FROM users WHERE user_email = ? AND user_pass = MD5(?)`;
  var values = [req.body.email, req.body.password];

  db.query(sqlQuery, values, function (err, results, fields) {

    if (err) {
      errors.push(err.message);
      res.render('login', {errors: errors});
      errors = [];
      return;
    }

    if (results.length == 1) {
      req.session.authorised = true;
      req.session.fname = results[0].user_fname;
      res.redirect('/');
    } else {
      errors.push('The email or password is incorrect.');
      res.render('login', {errors: errors});
      errors = [];
    }

  });
});

module.exports = router;
