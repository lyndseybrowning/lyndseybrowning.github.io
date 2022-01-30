---
layout: post
title: "#100DaysofCode - Day 3"
date: January 11, 2017
pageClass: post
---

On Day 3, I continued to work on the [Dictionary API](https://github.com/lyndseybrowning/dictionary-api).

Progress was slow but steady. I refactored some existing code in the ```trie.js``` file. I wanted to make my code more readable.

I created a method for handling routes in multiple files. I want to split my routes up into specific categories such as:

- generics (e.g. checking a word exists)
- lists (e.g. suffix, prefix, anagrams, sub-anagrams)
- tries (e.g. full dictionary or tries based on custom values)

I decided to create a single file in the routes folder (```main.js```) which would be responsible for reading in and initialising all other routes in the same directory.

I achieved this using the following code:

**routes/main.js**

```javascript
import fs from 'fs';

function initRoute(app, route) {
  require(`./${route}`)(app);
}

function filterRoutes(filename) {
  return filename[0] === '_';
}

const routes = {
  init(app) {
    fs.readdir(__dirname, (err, files) => {
      files
        .filter(filterRoutes)
        .forEach(initRoute.bind(null, app));
    });
  }
};

export default routes;
```

The ```routes.init()``` method reads in all files from the current directory and filters filenames that start with an underscore. It then loops through each filtered file and uses node's ```require()``` method to load and initialise each file ```require(`./${route}`)(app);```.

Each new file I create in the routes folder prefixed with an underscore will now automatically be loaded in via the main file.

I moved my existing route out into the ```_generics.js``` file and remembered to export it using ```module.exports``` method. You cannot require() a file that's been exported using ES6's export method.

```javascript
import trie from '../trie';

const generics = (app) => {
  app.get('/exists/:word', (req, res) => {
    const word = req.params.word;
    res.send(trie.contains(word));
  });
}

module.exports = generics;
```

Everything still works as expected, but now my routes can be separated out and categorised easily.

**Thoughts for Day 4:** Create routes for handling word lists based on length. 

Link to Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
