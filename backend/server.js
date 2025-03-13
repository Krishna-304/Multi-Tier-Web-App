const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configure MySQL database connection
const db = mysql.createConnection({
    host: "your-database-host", // Azure MySQL host
    user: "your-username",
    password: "your-password",
    database: "your-database-name"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

app.post("/api/storeName", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required." });
    }

    const query = "INSERT INTO names (name) VALUES (?)";
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error("Error inserting name:", err);
            res.status(500).json({ error: "Database error." });
        } else {
            res.json({ message: "Name stored successfully!" });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
