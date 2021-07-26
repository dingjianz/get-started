const express = require('express');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');
const devProxy = require('./proxy');

const env = process.env.NODE_ENV;
const dev = env !== 'production';

const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = proxyMiddleware;
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(10086, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on 10086 [${env}]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
