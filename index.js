import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./db.js";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ✅ Connect to Supabase
pool.connect()
  .then(() => console.log("Connected to Supabase"))
  .catch((err) => console.error("Connection error", err));

// ✅ Fetch all items
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM items ORDER BY id ASC");
        res.render("index.ejs", { items: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ Add new item
app.post("/add", async (req, res) => {
    const newItem = req.body.newTask;
    try {
        await pool.query("INSERT INTO items (title) VALUES ($1)", [newItem]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ Edit item
app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.newTitle;
    try {
        await pool.query("UPDATE items SET title = $1 WHERE id = $2", [newTitle, id]);
        res.redirect("/");
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).send("Server Error: " + err.message);
    }
});

// ✅ Delete item
app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("DELETE FROM items WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
