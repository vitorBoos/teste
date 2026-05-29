const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock Data
let users = [{ id: 1, email: 'admin@petshop.com', password: 'password' }];
let pets = [];
let clients = [];

// Auth
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// CRUD - Pets
app.get('/api/pets', (req, res) => res.json(pets));
app.post('/api/pets', (req, res) => {
  const newPet = { id: Date.now(), ...req.body };
  pets.push(newPet);
  res.json(newPet);
});
app.put('/api/pets/:id', (req, res) => {
  const index = pets.findIndex(p => p.id == req.params.id);
  pets[index] = { ...pets[index], ...req.body };
  res.json(pets[index]);
});
app.delete('/api/pets/:id', (req, res) => {
  pets = pets.filter(p => p.id != req.params.id);
  res.json({ success: true });
});

// CRUD - Clients
app.get('/api/clients', (req, res) => res.json(clients));
app.post('/api/clients', (req, res) => {
  const newClient = { id: Date.now(), ...req.body };
  clients.push(newClient);
  res.json(newClient);
});
app.put('/api/clients/:id', (req, res) => {
  const index = clients.findIndex(c => c.id == req.params.id);
  clients[index] = { ...clients[index], ...req.body };
  res.json(clients[index]);
});
app.delete('/api/clients/:id', (req, res) => {
  clients = clients.filter(c => c.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));
