---
layout: post
title: "#100DaysofCode - Day 5"
date: January 13, 2017
pageClass: post
---

Current Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api).

On Day 4, I discussed how I created a custom error handler to catch invalid routes and how I called the catch-all route after each of my valid routes were initialised. The code was something like this:

```
for each file in routes/ directory
  initialise route using require(route)(app);
  initialise catch-all route after route is initialised.
loop
```

I was unhappy with this approach knowing the catch-all route would eventually be called multiple times as I started adding more route files.

I'd previously and unsuccessfully tried adding the catch-all route underneath the code that read in files from the routes directory, using ```fs.readdir()```.

It wasn't until I stepped back from the code and took a break that I realised my above solution would never work, because the ```readdir()``` method is **asynchronous**! I'd need to know when the files had all been read in before initialising the catch-all route.

So, to resolve my issue, I used the ```readdirSync()``` function instead. This is the **synchronous** version of ```readdir()``` and ensures that the next line of code in the program is only executed when the current execution is complete.

Here is my updated, working code:

```javascript
const routes = {
  init(app, callback) {
    const routeFiles = fs.readdirSync(__dirname);
    routeFiles
      .filter(filterRoutes)
      .forEach(initRoute.bind(null, app));

    initCatchAllRoute(app);
  }
};
```

Please check out [routes/main.js](https://github.com/lyndseybrowning/dictionary-api/blob/master/src/routes/main.js) to see the complete module.

Now that that was out of the way, I could start creating some more routes.

I created a new routes file called ```_lists.js```. This route will handle requests for word lists, such as words of n length or words with a given prefix or suffix.

I started with a basic parameter: **word length**.

This route allows a user to request a list of words of ***n*** length, using the following request format:

**/api/lists?length=3**

The route handler first loads in the whole dictionary as an array then filters it by the length parameter passed in. Here is an example:

```javascript
import dictionary from '../dictionary';

// load dictionary in memory
const _dictionary = dictionary.get();

// this function takes a length and a single word
// and returns true if the word is of the length passed in
// e.g. filterByLength(3, 'hello') returns false
function filterByLength(length, word) {
  return word.length === length;
}

app.get('/api/lists', (req, res) => {
  const length = parseInt(req.query.length, 10);
  // filter the dictionary to words of length
  const wordList = _dictionary.filter(filterByLength.bind(null, length));
}
```

This is an example of the data returned when words of 3 letters are requested (truncated for readability):

```json
{"wordLength":3,"wordsFound":1292,"wordList":["AAH","AAL","AAS","ABA","ABB","ABO","ABS","ABY", "..."]}
```

It handles many more! 25 letters:

```json
{"wordLength":25,"wordsFound":2,"wordList":["IMMUNOELECTROPHORETICALLY","PHOSPHATIDYLETHANOLAMINES"]}
```

... all the way up to one of my favourite words:

```json
{"wordLength":28,"wordsFound":2,"wordList":["ANTIDISESTABLISHMENTARIANISM","ETHYLENEDIAMINETETRAACETATES"]}
```

Very cool!

The full module can be found here: [_lists.js](https://github.com/lyndseybrowning/dictionary-api/blob/master/src/routes/_lists.js)

My next step is to use [express-validator](https://github.com/ctavan/express-validator) to validate query parameters, before I start creating additional routes.

Progress is still slow but I am learning a lot about Node and Express each day. This is my first Node/Express project and I am excited for the outcome.

Any questions or suggestions, please use the comments below, and thanks for reading!

**Thoughts for Day 6:** Start validating! Create the prefix route.

Link to Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
