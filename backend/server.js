const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.user(express.json());

app.use(cors());

// Corrected: Changed `user` to `use`
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json("Error: " + err.message);
        }
        return res.json(data);
    });
});
app.post('/create', (req, res) =>{
    const sql = "INSERT INTO student ('Name', 'Email') VALUES(?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) =>{
    const sql = "update student set `Name` = ?, `Email` = ? where ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete('/student/:id', (req, res) =>{
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
