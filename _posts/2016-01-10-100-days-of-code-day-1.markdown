---
layout: post
title: "#100DaysofCode - Day 1"
date: January 09, 2017
pageClass: post
---

Today I decided to join the [#100DaysOfCode](https://medium.freecodecamp.com/join-the-100daysofcode-556ddb4579e4#.a15whv210) Challenge.

I've committed myself to coding for at least one hour every day.

I will blog about my progress at the end of each day.

## Why?


- I want to improve my JavaScript skills.
- I want to motivate myself to **complete** side-projects.
- Blogging about my day will help reinforce what I've learned.


## Day 1 - 9th January, 2017


I started work on a Dictionary API (Node and Express) to be used in conjunction with my [Boggle Solver](http://lyndseyb.co.uk/boggle-solver/).


**API Requirements:**

- Check word validity
- Get word lists based on length, prefix or suffix 
- Get anagrams and sub-anagrams of a word
- Solve a boggle-style grid of letters
- Get a word list in Trie format

I completed the initial set up of the server and set up [Babel](https://babeljs.io/) to utilise ES6 Modules.

I learned a little bit about blocking and non-blocking when it comes to file reading. I am using Node's ```fs``` module to read a file asynchronously using the ```readFile()``` method. I was erroneously trying to return the number of lines in the file before the ```readFile()``` method had completed. I wanted the Dictionary to be loaded in before I started the Node server. I resolved the issue using callbacks. Here is an example:

** Module - dictionary.js **
```javascript
const init = (callback) => {
	fs.readFile(dictionary, 'utf8', (err, dict) => {
	  if(err) {
		throw err;
	  }

      const wordCount = dict.split('\n');
      if(callback && typeof callback === 'function') {
        return callback(null, {
          wordCount: wordCount.length
        });
      }
	  return null;
	});

	// WRONG! I was originally returning here!
}
```

**index.js**
```javascript
dictionary.init((err, result) => {
  if(err) {
    throw err;
  }
  app.server = http.createServer(app);
  app.server.listen(port);
  app.get('/', (err, res) => {
    res.send(`Dictionary Loaded: ${result.wordCount} words!`); // loaded 270,000 words!
  });
});
```

*See the Link to Project at the bottom of the page to view the full code*

**Thoughts for Day 2:** I want to continue expanding the API by creating some routes.

**Link to Project:** [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
