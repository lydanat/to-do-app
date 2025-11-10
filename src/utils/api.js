// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const todoAPI = {
  async get() {
    const response = await axios.get(`${API_BASE_URL}/todos?_limit=10`);
    return response.data.map(todo => ({
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
      createdAt: new Date()
    }));
  },

  async create(todo) {
    const response = await axios.post(`${API_BASE_URL}/todos`, {
      title: todo.text,
      completed: todo.completed,
      userId: 1
    });
    return { ...todo, id: Date.now() };
  },

  async update(id, updates) {
    await axios.patch(`${API_BASE_URL}/todos/${id}`, updates);
    return { id, ...updates };
  },

  async deleteTodo(id) {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
    return id;
  }
};