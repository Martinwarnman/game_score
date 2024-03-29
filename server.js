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

app.get("/getusers", (req, res, next) => {
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

app.post("/add2", (req, res, next) => {
console.log(req.body);

db.run(`INSERT INTO games (name, creator, year) VALUES (?,?,?)`, [req.body.name,req.body.creator,req.body.year], function(err) {
  if (err) {
  return console.log(err.message);
  }
  // get the last insert id
  c1= this.lastID;
  console.log(`1.A row has been inserted with rowid ${this.lastID}`);
  console.log(this.lastID);
  db.run(`INSERT INTO users (player,age) VALUES (?,?)`, [req.body.player,req.body.age], function(err) {
  if (err) {
  return console.log(err.message);
  }
  
  // get the last insert id
  c2= this.lastID;
  console.log(`2.2.A row has been inserted with rowid ${c1} ${this.lastID}`);
  console.log(this.lastID);
  db.run(`INSERT INTO ratings (stars,users_id,games_id) VALUES (?,?,?)`,[req.body.stars,c2,c1],function(err) {
  if (err) {
  return console.log(err.message);
  }
  console.log(`3.A row has been inserted with rowid ${c1} ${c2} ${this.lastID}`);
  console.log(this.lastID);
  })
  })
  })
  res.json({
    "message":"success"
     })
    })//end of db.run
/*
app.post("/add", (req, res, next) => {
 console.log(req.body.name)
  var sql = "INSERT INTO games(name, creator, year) VALUES (?,?,?)"
 db.run(sql, [req.body.name,req.body.creator,req.body.year], function(err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
  "message":"success"
   })
  })//end of db.run
});
*/
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});