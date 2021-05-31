import express from './express';

const REDIS_URI = process.env.REDIS_URI || 'redis://localhost:6379';
const queueNames = (process.env.QUEUE_NAMES || '').split(',');
const PORT = 8080;
const PROVIDER = process.env.PROVIDER || 'express';

(async () => {
  const provider = {
    express,
  };

  provider[PROVIDER](REDIS_URI, queueNames, PORT);
})();
