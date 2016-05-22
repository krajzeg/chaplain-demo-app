"use strict";

var consolidate = require('consolidate');
var express = require('express');
var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');

// ================================================================

var data = yaml.safeLoad(fs.readFileSync(
  __dirname + '/data/bacon-ipsum.yaml', 'utf8'
));

// ================================================================

var app = express();
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static('public'));

// ================================================================

app.get('/', function(req, res) {
  res.render('main.html', {
    paragraphs: data.paragraphs
  });
});

// ================================================================

app.get('/bacon/:paragraphs?', function(req, res) {
  var requiredCount = parseInt(req.params.paragraphs || "3");
  var paras = data.paragraphs.slice(0, requiredCount);
  res.json({
    paragraphs: paras
  });
});

// ================================================================

app.use(function(err, req, res, next) {
  if (err) res.status(500).send("Internal server error.");
  res.status(404).send("Not found.");
});

// ================================================================

module.exports = app;
