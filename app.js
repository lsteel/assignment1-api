var express = require('express'),
    reps = require('./lib/reps');

var app = express();

app.get('/', function(req, res) {
  res
    .status(200)
    .send('Welcome to my api!');
});

app.get('/api/all/by-zip/:zip', function(req, res, next) {
  reps.allByZip(req.params.zip, function(err, results) {
    if (err) {
      res.status(500).send(err);
    }
    else if (results) {
      res.send(results);
      next();
    }
    else {
      res.status(404).send('Zip not found.');
    }
  });
});

app.get('/api/reps/by-name/:lastName', function(req, res, next) {
  reps.repsByName(req.params.lastName, function(err, results) {
    if (err) {
      res.status(500).send(err);
    }
    else if (results) {
      res.send(results);
      next();
    }
    else {
      res.status(404).send('Last name not found.');
    }
  });
});

app.get('/api/reps/by-state/:state', function(req, res, next) {
  reps.repsByState(req.params.state, function(err, results) {
    if (err) {
      res.status(500).send(err);
    }
    else if (results) {
      res.send(results);
      next();
    }
    else {
      res.status(404).send('State not found.');
    }
  });
});

app.get('/api/sens/by-name/:lastName', function(req, res, next) {
  reps.sensByName(req.params.lastName, function(err, results) {
    if (err) {
      res.status(500).send(err);
    }
    else if (results) {
      res.send(results);
      next();
    }
    else {
      res.status(404).send('Last name not found.');
    }
  });
});

app.get('/api/sens/by-state/:state', function(req, res, next) {
  reps.sensByState(req.params.state, function(err, results) {
    if (err) {
      res.status(500).send(err);
    }
    else if (results) {
      res.send(results);
      next();
    }
    else {
      res.status(404).send('State not found.');
    }
  });
});

app.listen(8000, function() {
  console.log('Listening on port 8000 :P');
});

module.exports = app;
