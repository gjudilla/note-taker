const express = require('express');
const fs = require('fs');
const path = require('path'); // Add this line to import the path module
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.static(__dirname + '/'));

// Path to the JSON database file
const db = '/db/.db.json';

// Function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(db);
  return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET route to fetch notes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Add import for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// POST route to save a note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = readData();
  notes.push(newNote);
  writeData(notes);
  res.status(201).json(newNote);
});

// DELETE route to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = readData();
  notes = notes.filter(note => note.id !== id);
  writeData(notes);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
