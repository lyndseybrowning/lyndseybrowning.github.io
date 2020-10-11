---
title: "100 days of code day 2"
date: 10th January 2017
keywords: ["100 days of code"]
---

Today I continued work on my [Dictionary API](https://github.com/lyndseybrowning/dictionary-api).

I worked on making my code more modular. I moved the server setup into its own module and limited the entry file to handling the dictionary setup only.

The index.js file is now much more compact:

```javascript
import dictionary from "./dictionary";
import server from "./server";

dictionary.init((err, res) => {
    if (err) {
        throw err;
    }
    server.init(res);
});
```

The server setup is now handled by the server.js module:

```javascript
import http from "http";
import express from "express";
import config from "./config";

const app = express();
const port = process.env.PORT || config.port;

const server = {
    init(dictionary) {
        app.server = http.createServer(app);
        app.use("/", express.static(`${__dirname}/public`));
        app.server.listen(port);
    },
};

export default server;
```

This has improved readability and I find my code much more manageable now.

I created the **trie** module to handle the dictionary. For now, this module contains methods to get the whole trie as a JavaScript object, add a word, check a word exists and check a prefix exists. I will expand this later, when I work on more complex routes.

I thought about documentation, serving public files and how I should structure my application. Should I put my html files in the same directory as my server-side content? Probably not. What about routes?

I did some Googling and found some handy links/tutorials regarding serving HTML content:

-[http://stackoverflow.com/questions/16593686/what-is-the-best-practice-for-serving-html-in-node-js-with-express-js](http://stackoverflow.com/questions/16593686/what-is-the-best-practice-for-serving-html-in-node-js-with-express-js) -[https://scotch.io/tutorials/use-expressjs-to-deliver-html-files](https://scotch.io/tutorials/use-expressjs-to-deliver-html-files)

I finished the evening off creating my first route to check a word exists, see example code below:

```javascript
import trie from "../trie.js";

export default {
    init(app, dictionary) {
        app.get("/exists/:word", (req, res) => {
            const word = req.params.word;
            res.send(trie.containsWord(word, dictionary.wordList));
        });
    },
};
```

I run some tests in my browser to check the method was working correctly:

-   [http://localhost:8080/exists/zyzzyva](http://localhost:8080/exists/zyzzyva) // false!
-   [http://localhost:8080/exists/antidisestablishmentarianism](http://localhost:8080/exists/antidisestablishmentarianism) // true!

It worked!

**Thoughts for Day 3:** Continue with routes. Modularise routes to separate concerns.

Link to Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
