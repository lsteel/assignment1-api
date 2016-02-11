'use strict';

const path = require('path');
const express = require('express');
const reps = require('./lib/reps');

const app = express();
const PORT = process.env.PORT || 8000;

app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', false);

app.get('/', function(req, res) {
  if (req.query.type === 'zip') {
    method = reps.allByZip;
  }
  else if (req.query.type === 'name') {
    method = reps.repsByName;
  }
  else if (req.query.type === 'state') {
    method = reps.repsByState;
  }

  if (method) {
    var method;
    method(req.query.search, function(err, people) {
      if (err) { return next(err);}
      res.render('index', {
        reps: people
      });
    });
  }
  else {
    res.render('index', {
      reps: null
    });
  }
});

app.get('/all/by-zip/:zip', function(req, res, next) {
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

app.get('/reps/by-name/:lastName', function(req, res, next) {
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

app.get('/reps/by-state/:state', function(req, res, next) {
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

app.get('/sens/by-name/:lastName', function(req, res, next) {
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

app.get('/sens/by-state/:state', function(req, res, next) {
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

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
