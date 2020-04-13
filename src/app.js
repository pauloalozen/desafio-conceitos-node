const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { url, title, techs, likes } = request.body
  
  const repositorie = {
    id:  uuid(),
    url,
    title,
    techs,
    likes,
  }
  
  repositories.push(repositorie)
  return response.json(repositorie)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { url, title, techs } = request.body
  
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (!repoIndex < 0) {
    return response.status(400).json({error:'Repositório não encontrado'})
  }

  if (url) {
    repositories[repoIndex].url = url  
  }

  if (title) {
    repositories[repoIndex].title = title
  }

  if (techs) {
    repositories[repoIndex].techs = techs
  }

  return response.json(repositories[repoIndex])
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params
  
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (!repoIndex < 0) {
    return response.status(400).json({error:'Repositório não encontrado'})
  }

  repositories.splice(repoIndex, 1)

  return response.json()
});

app.put('/repositories/:id/likes', (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (!repoIndex < 0) {
    return response.status(400).json({error:'Repositório não encontrado'})
  }
  
  repositories[repoIndex].likes = repositories[repoIndex].likes + 1

  return response.json(repositories[repoIndex])

});

module.exports = app;
