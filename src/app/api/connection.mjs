import cors from 'cors';
import express from 'express';
// import getUsers from './db.mjs'
import { getProviders } from './db.mjs';
import { deleteProvider } from './db.mjs';
import { updateProvider } from './db.mjs';
import { postProvider } from './db.mjs';
import { getSeekers } from './db.mjs';
import { deleteSeeker } from './db.mjs';
import { updateSeeker } from './db.mjs';
import { postSeeker } from './db.mjs';
import { getOffers } from './db.mjs';
import { deleteOffer } from './db.mjs';
import { updateOffer } from './db.mjs';
import { postOffer } from './db.mjs';
import { getLocations } from './db.mjs';
import { deleteLocation } from './db.mjs';
import { updateLocation } from './db.mjs';
import { postLocation } from './db.mjs';
const app = express();

app.use(cors());
app.use(express.json());

// app.get('/users', async (req, res) => {
//     const users = await getUsers();
//     res.json(users);
// });

app.get('/providers', async (req, res) => {
  const providers = await getProviders();
  res.json(providers);
});

app.delete('/providers/:name', async (req, res) => {
  const providerName = req.params.name;
  try {
    // Call the deleteProvider function to delete the provider by name
    await deleteProvider(providerName);
    res.status(204).send(); // Successfully deleted, send a 204 No Content status
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/providers/:name', async (req, res) => {
  const providerName = req.params.name;
  const phone  = req.body.phone;
  const email  = req.body.email;
  const status = req.body.status;
  const type = req.body.type;
  try {
    
    await updateProvider(providerName, email,phone, status,type);

    res.status(200).json({ message: 'Provider updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/providers', async (req, res) => {
  const { name, email, phone, status,type } = req.body;
  try {
    // Call the postProvider function to add a new provider
    await postProvider(name, email, phone, status, type);
    res.status(201).json({ message: 'Provider added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//seekers table

app.get('/seekers', async (req, res) => {
  const seekers = await getSeekers();
  res.json(seekers);
});

app.delete('/seekers/:name', async (req, res) => {
  const seekerName = req.params.name;
  try {
    
    await deleteSeeker(seekerName);
    res.status(204).send(); // Successfully deleted, send a 204 No Content status
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/seekers/:name', async (req, res) => {
  const seekerName = req.params.name;
  const phone  = req.body.phone;
  const email  = req.body.email;
  const status = req.body.status;
  const date = req.body.date;
  const applicant = req.body.applicant;
  try {
    
    await updateSeeker(seekerName, email,phone, status, date, applicant);

    res.status(200).json({ message: 'Seeker updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/seekers', async (req, res) => {
  const { name, email, phone, status,date, applicant } = req.body;
  try {
    // Call the postProvider function to add a new provider
    await postSeeker(name, email, phone, status, date, applicant);
    res.status(201).json({ message: 'Seeker added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//offers table
app.get('/offers', async (req, res) => {
  const offers = await getOffers();
  res.json(offers);
});
app.delete('/offers/:name', async (req, res) => {
  const offerName = req.params.name;
  try {
    // Call the deleteProvider function to delete the provider by name
    await deleteOffer(offerName);
    res.status(204).send(); // Successfully deleted, send a 204 No Content status
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/offers/:name', async (req, res) => {
  const offerName = req.params.name;
  const category  = req.body.category;
  const creationDate  = req.body.creationDate;
  const status = req.body.status;
  try {
    
    await updateOffer(offerName, creationDate,category, status);

    res.status(200).json({ message: 'Offer updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/offers', async (req, res) => {
  const { name, creationDate, category, status } = req.body;
  try {
    // Call the postProvider function to add a new provider
    await postOffer(name, creationDate, category, status);
    res.status(201).json({ message: 'offer added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//locations table
app.get('/locations', async (req, res) => {
  const locations = await getLocations();
  res.json(locations);
});
app.delete('/locations/:idl', async (req, res) => {
  const locationName = req.params.idl;
  try {
    // Call the deleteProvider function to delete the provider by name
    await deleteLocation(locationName);
    res.status(204).send(); // Successfully deleted, send a 204 No Content status
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/locations/:idl', async (req, res) => {
  const locationName = req.params.idl;
  const position  = req.body.position;
  const location  = req.body.location;
  const company = req.body.company;
  const matches = req.body.matches;
  try {
    
    await updateLocation(locationName, position,location, company, matches);

    res.status(200).json({ message: 'location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/locations', async (req, res) => {
  const { position, location, company, matches } = req.body;
  try {
    // Call the postProvider function to add a new provider
    await postLocation(position, location, company, matches);
    res.status(201).json({ message: 'offer added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});