"use strict"
const express = require("express");
const routes = express.Router();

const movies = [
    {id: 1, title: "Batman", year: 1992, animated: false},
    {id: 2, title: "The Lion King", year: 1994, animated: false},
    {id: 3, title: "SuperBad", year: 2008, animated: true},
    {id: 4, title: "Black Panther", year: 2018, animated: false},
];
let nextId = 5;

// GET /mobies -responds with a JSON list of movies
routes.get("/movies", (req, res) =>{
  res.json(movies);
});

routes.get("/movies/:id", (req,res)=>{
  const id = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === id);
  if (movie ){
    res.json(movie);
  } else {
    res.status(404);
    res.send('No movie with id ${id} exists.'); 
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body; 
  movie.id = nextId++
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex(movie => movie.id);
  if (index !== -1) {
    movies.splice(index,1)
  }
  res.status(204);
  res.send();
  // or res.json()
});




 


module.exports = routes; 