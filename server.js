var express = require("express");

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// listen on port 3000
var PORT = process.env.PORT || 3000;
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App now listening on port:", PORT);
  });
});
