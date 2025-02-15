const Groq = require('groq');
const groq = require('groq-sdk');
const config = require('./groq.config.json');

const introduction = "***CTF***"

const prompt = `${introduction};${instance}`

const system = `system {
    {
      name,
      email,
      age
    }
}`;
const assistant = `assistant {
    {
      name,
      email,
      age
    }
  }`;

  const users = `users {
    {
      name,
      email,
      age
    }
  }`;

const ML =`✨${system}`;
const IA =`✨${assistant}`;
const Web =`✨${users}`;
const instance =`${ML}, ${IA}, ${Web}`;
console.log(instance)