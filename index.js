import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js';
import { injectSpeedInsights } from '@vercel/speed-insights';
 
injectSpeedInsights();
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Set up Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Middleware to parse JSON and URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

// Endpoint to render the main page
app.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from('items').select().order('id', { ascending: true });
    if (error) {
      throw error;
    }
    res.render("index", { items: data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Endpoint to add a new item
app.post("/add", async (req, res) => {
  const newItem = req.body.newTask;
  try {
    const { data, error } = await supabase.from('items').insert([{ title: newItem }]);
    if (error) {
      throw error;
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Endpoint to edit an existing item
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.newTitle;
  try {
    const { data, error } = await supabase.from('items').update({ title: newTitle }).eq('id', id);
    if (error) {
      throw error;
    }
    res.redirect("/");
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).send("Server Error:" + err.message);
  }
});

// Endpoint to delete an item
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase.from('items').delete().eq('id', id);
    if (error) {
      throw error;
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
