var express = require("express")
var app = express()
var db = require("./databas.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static('public'))

app.get("/api/getusers/", (req, res, next) => {
  var sql = "select * from users"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});
app.get("/pns", (req, res, next) => {
    var sql = "SELECT users.player, games.name, ratings.stars from games inner join ratings on games.id = ratings.games_id inner join users on users.id = ratings.users_id"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

/*
app.get("/api/cars/model/", (req, res, next) => {
    var sql = "select model from cars"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
*/
/*
app.get("/api/cars/make/:make", (req, res, next) => {
    var sql = "select * from cars where make = ?"
    var params = [req.params.make]
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
*/
/*
app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
*/
// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
