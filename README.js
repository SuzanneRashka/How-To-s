
This is a rundown how to build an server-side database-driven application.

****************** EXPRESS.js ******************

1) create your directory and cd into it
2) create a server.js file by touch or cat
3) initialize a package.json file by 'npm init' -y to say yes to all.
4) npm install --save pg express nodemon body-parser morgan
5) open atom .
6) apply the following code to open the port on server.js and write response and requests:
      'use strict';

      //option 3 - path to JSON formatted guests.json file
      const fs = require('fs');
      const path = require('path');
      const guestsPath = path.join(__dirname, 'guests.json');
      // end option 3
      const express = require('express');
      const app = express();
      const port = process.env.PORT || 8000;

      const morgan = require('morgan');
      const bodyParser = require('body-parser');
      // knex short link to file
      const artists = require('./routes/artists');
      const tracks = require('./routes/tracks');
      //router middleware
      app.use(artists);
      app.use(tracks);

      app.disable('x-powered-by');
      //option 1 sending a response
      app.use(function(req, res) {
        res.send('I am online');
      });
      //option 2 direct array
      app.use(function(res, res){
        guests =['Archer', 'Lana'];
        res.send(guests);
      });
      //option 3 app.gets from seperate file
      app.get('/guests', function(req, res) {
        fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
          if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
          }

           guests = JSON.parse(guestsJSON);

          res.send(guests);
        });
      });
      // response for individual records
      app.get('/guests/:id', function(req, res) {
        fs.readFile(guestsPath, 'utf8', function(err, guestsJSON)
          if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
          }

          let id = Number.parseInt(req.params.id);
          let guests = JSON.parse(guestsJSON);

          if (id < 0 || id >= guests.length || Number.isNaN(id)) {
            return res.sendStatus(404);
          }

          res.set('Content-Type', 'text/plain');
          res.send(guests[id]);
        });
      });
      // to add dynamic route to application using url parameters
      app.get("/hello/:name", function (req, res) {//I think it would just be /whatever. __dirname would already route
        res.send( "Hello, " + req.params.name );
      });
      //knex request
      router.get('/artists/:id', (req, res, next) => {
        knex('artists')
        .where('id', req.params.id)
        .first()
        .then((artist) => {
          if (!artist) {
            return next();
          }

          res.send(artist);
        })
        .catch((err) => {
          next(err);
        });
    });

      app.use(function(req, res) {
        res.sendStatus(404);
      });

      app.listen(port, function() {
      console.log('Listening on port', port);
      });
      module.exports = app;

7) run the nodemon command in terminal
      'nodemon server.js'
8) In a separate Terminal tab, send an HTTP request to the server
      'http GET localhost:8000/'
      You should get a response  of 'I am online'

****************** 'Testing' ******************
Not written yet

****************** 'Linting' ******************

NOTE * Just set it up and be done with it!
*'https://gist.github.com/olitreadwell/8cada521d91137cd5d5155cba020e897'

****************** KNEX.js ******************
NOTE * (http://knexjs.org/#knexfile)
NOTE * jQuery runs inside a web browser while Knex runs outside a web browser using Node.js.

1) create a database
    'createdb name_dev', delete any db by dropdb name...
2) make new directory for database and cd into
3) npm init
4) npm install --save pg KNEX
5) touch knexfile.js and index.js
6) add the following general code to the knexfile.js
      module.exports = {

        development: {
          client: 'pg',
          connection: 'postgres://localhost/entertainment_dev'
        },

        production: {
          client: 'pg',
          connection: process.env.DATABASE_URL
        }

      }


      ** You should have `development` `test` and `production`.

7) Then in your command to migrate and seed you will do so with 'knex migrate:latest —env <name of environment>'

8) add the following general code to index.js
      'use strict';

      const env = 'development';
      const config = require('./knexfile.js')[env];
      const knex = require('knex')(config);

      const sql = knex('movies').toString();

      console.log(sql);

      knex.destroy();
9) excute the program by running
      node index.js
10) use postgres to filter through the database. ex SELECT * FROM movies;

****************** 'Migration' ******************
NOTE * (http://knexjs.org/#Migrations-CLI)
NOTE * If you want to migrate or seed to a certain database you need to ensure you have the environment name in your `knexfile.js`

1) 'npm install knex -g' then 'knex init'
2) make your migration files with 'knex migrate:make migration_name'
        'knex migrate:make artist'
        'knex migrate:make track'
3) Insert example code and change as needed...
        'use strict';
        exports.up = function(knex) {
          return knex.schema.createTable('books', (table) => {
            table.increments();
            table.string('title').notNullable().defaultTo('');
            table.text('description').notNullable().defaultTo('');
            table.text('cover_url').notNullable().defaultTo('');
            table.timestamps(true, true);
          });
        };

4) update the matching database with 'knex migrate:latest'
    - you can also pass --env to select the environment
    'knex migrate:latest --env production'
5) to rollback the last batch of migrations:
    'knex migrate:rollback'

****************** 'Seeding' ******************
NOTE * (http://knexjs.org/#Schema)
NOTE * seed files allow you to popultate your database with test or seed data independent of your migration file.
1) knex seed:make seed_name
2) Insert example code and change as needed to above made file...
    'use strict';
    exports.seed = function(knex) {
      // Deletes ALL existing entries
      return knex('users').del()
        .then(() => knex('users').insert({
          first_name: 'Joanne',
          last_name: 'Rowling',
          email: 'jkrowling@gmail.com',
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }));
    };

2) knex seed:run in command line
