---
layout: post
title: "#100DaysofCode - Day 7"
date: January 15, 2017
pageClass: post
---

Current Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api).

Today I created the functions that would retrieve word lists based on prefix, suffix, length or a combination of them all.

First, I created three functions that would be used inside an ```Array.filter()``` method to return the requested data:

```javascript
function filterByLength(length, word) {
  return word.length === length;
}

function filterByPrefix(prefix, word) {
  const prefixLen = prefix.length;
  const isValidWordLen = word.length >= prefixLen;
  const isPrefix = word.substring(0, prefixLen) === prefix.toUpperCase();

  return isValidWordLen && isPrefix;
}

function filterBySuffix(suffix, word) {
  const wordLen = word.length;
  const wordSuffix = word.substring(wordLen - suffix.length, wordLen);

  return wordSuffix === suffix.toUpperCase();
}
```

The ```filterByLength()``` function returns truthy if the length of the word passed in is equal to the length parameter, e.g.

```javascript
filterByLength(7, 'charter'); // true
filterByLength(7, 'dog'); // false
```

The ```filterByPrefix()``` function takes a prefix and the current word and checks to see if the prefix of the word is the same as the prefix. e.g.

```javascript
filterByPrefix('char', 'charter'); // true
filterByPrefix('art', 'charter'); // false
```

The ```filterBySuffix()``` function is identical to the prefix function only the last characters of the word are tested instead of the first. Example:

```javascript
filterBySuffix('arter', 'charter'); // true
filterBySuffix('ing', 'charter'); // false
```

Once the functions were created, I could filter the dictionary. Here is the code I used to do this:

```javascript
let wordList = _dictionary;
if(req.query.suffix) {
  wordList = wordList.filter(filterBySuffix.bind(null, suffix));
}

if(req.query.prefix) {
  wordList = wordList.filter(filterByPrefix.bind(null, prefix));
}

if(req.query.length) {
  wordList = wordList.filter(filterByLength.bind(null, parseInt(length, 10)));
}
```

First I store the whole dictionary array into the ```wordList``` variable, then I use the ```filter()``` method to filter the dictionary based on each of the three available parameters.

Here is a sample of the output based on different combinations of all three parameters:

**/api/lists?length=12&prefix=abb**

```json
{
  "wordsFound": 5,
  "wordList": [
    "ABBREVIATING",
    "ABBREVIATION",
    "ABBREVIATORS",
    "ABBREVIATORY",
    "ABBREVIATURE"
  ]
}
```

**/api/lists?length=8&prefix=car&suffix=ing**

```json
{
  "wordsFound": 5,
  "wordList": [
    "CARGOING",
    "CARNYING",
    "CAROLING",
    "CAROMING",
    "CARRYING"
  ]
}
```

**/api/lists?suffix=ing**

```json
{

  "wordsFound": 18751,
  "wordList": [
    "AAHING",
    "ABANDING",
    "ABANDONING",
    "ABASHING",
    "ABASING",
    "ABATING",
    "ABBREVIATING",
    "..."
  ]
}
```

**Thoughts for Day 8:** I'd like to performance test trie vs array for retrieving word lists. For now, I've used a standard Array but I'd be interested in seeing if the Trie look ups will be faster.

Any questions or comments, please use the Disqus form below! Thanks for reading!

Link to Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
