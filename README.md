# Steps for beginning an application

## Concept, start with the item with the fewest dependencies, in our case the database
## Our database doesn't really know or care that our web server exists

#### Database
1. Create a database 
2. Create a table
3. Insert a few values into the table
4. Save all of these in a schema.sql file so you can "Reset" your database easily

## Next we are making our webserver

#### Web Server
0. Create a package.json
1. Create an express app (npm install expresss and your other dependencies)
2. Make a test route so you can confirm the server is running
3. Create a connection from your web server to your database
4. Make a GET route that returns a simple "SELECT * FROM (table)" Statement


## Next we're going to build some views, in our case handlebars

#### Handlebars
1. Make sure you have a `views` folder
2. inside the views `folder` include a layouts folder.
3. Configure the handlebars app (boilerplate, see examples)
4. Convert your initial GET route to use res.render instead of res.json
NOTE: you don't need to do this for ALL your get routes, just ones that should return HTML

5. Make subsequent routes like POST, PUT, and DELETE, with their relevant MYSQL pieces
6. Call those routes with AJAX requests from the frontend
