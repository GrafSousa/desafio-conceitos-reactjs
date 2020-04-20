import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function retrieveRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const date = new Date();
    const response = await api.post('/repositories', {
      title: `title ${date}`,
      url: `url ${date}`,
      techs: [`tech1 ${date}`, `tech2 ${date}`, `tech3 ${date}`]
    });
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  useEffect(() => {
    retrieveRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
