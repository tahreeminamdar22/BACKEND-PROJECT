import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";


const app = express();
const port = 3000;
dotenv.config();
const dbConfig = {
    user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const db = new pg.Client(dbConfig);
db.connect((err) => {
    if (err) {
        console.error("connection error", err);
        return;
    }
    console.log("connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items ORDER BY id ASC");
        const items = result.rows;
        res.render("index", { items: items });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

app.post("/add", async (req, res) => {
    const newItem = req.body.newTask;
    try {
        await db.query("INSERT INTO items (title) VALUES ($1)", [newItem]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.newTitle;

    try {
        await db.query("UPDATE items SET title = $1 WHERE id = $2", [newTitle, id]);
        res.redirect("/");
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).send("Server Error:" + err.message);
    }
});

app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM items WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
