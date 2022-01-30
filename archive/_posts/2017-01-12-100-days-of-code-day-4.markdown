---
layout: post
title: "#100DaysofCode - Day 4"
date: January 12, 2017
pageClass: post
---

I continued work on the [Dictionary API](https://github.com/lyndseybrowning/dictionary-api).

My plan was to create some more routes, get some data being returned from the API. Unfortunately, I got hung up trying to validate the routes themselves.

I want the API to return an error message when an undefined route is accessed. For now, the only route in my API is ```/api/valid/:word``` which checks that the passed in word is valid in the dictionary.

If someone tries to access ```/api/otherroute/``` I want to return a friendly message back to the user.

I looked through the Express documentation (link at bottom of post) and found a page describing error handling. I followed through the tutorial to create my own error handler module:

**middleware/errorHandler.js**

```javascript
const dev = process.node_env === 'development';

function errorHandler(err, req, res, next) {
  const handler = {
    message: err.message,
    error: dev ? err.stack : {}
  };

  res.status(err.status || 500).send(handler);
}

export default errorHandler;
```

**server.js**

```javascript
import errorHandler from './middleware/errorHandler';

app.use(errorHandler);
```

Now, I needed to create the catch-all route handler that would force the errorHandler to be called. I created the following:

```javascript
app.get('/api/*', (req, res, next) => {
  res.send({
    status: 404,
    message: `Invalid URL requested: ${req.url}`
  });
});
```

Most of the documentation I read online said I needed to place my catch-all handler below any existing routes so that my existing routes would take precedence.

So I simply placed the catch-all in the main **server.js** file after initialising the routes:

```javascript
routes.init();
app.get('/api/*', (req, res, next) => {
  res.send({
    status: 404,
    message: `Invalid URL requested: ${req.url}`
  });
});
```

However, this did not work! Every route I accessed, even the valid route, was falling into the catch-all incorrectly. I was very confused! Surely this was correct? I moved the catch-all around, inside **routes/main.js** after requiring all routes and that still didn't work.

In the end, I got it working by instantiating the catch-all after each individual route was required:

```javascript
function initRoute(app, callback, route) {
  require(`./${route}`)(app);
  initInvalidRoutes(app);
}

function initInvalidRoutes(app) {
  app.get('/api/*', (req, res, next) => {
    res.send({
      status: 404,
      message: `Invalid URL requested: ${req.url}`
    });
  });
}
```

It now works! But I feel like this isn't the best solution. The ```initRoute()``` method above is called for every file inside the ```routes``` directory, therefore it is called multiple times. Should I be creating the catch-all route for every individual route file? Shouldn't I be creating it once, after all routes have been declared?

I'm still yet to figure out a solution for this, so if anyone has any advice for improvements or alternative solutions, please let me know!

Some useful links:

- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Catch All Routing](http://stackoverflow.com/questions/19313016/catch-all-route-except-for-login)

**Thoughts for Day 5:** Whilst my code is working, I don't feel like I've used the right approach and would like to do some further reading and learning before I move on to creating additional routes.

Link to Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
