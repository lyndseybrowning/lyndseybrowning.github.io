---
layout: post
title: "#100DaysofCode - Day 8"
date: January 16, 2017
pageClass: post
---

Current Project: [Word API](https://github.com/lyndseybrowning/word-api).

I renamed the project today because I think **word-api** better reflects what the API does. It doesn't store word definitions like a typical dictionary would do; it simply returns filtered lists and permutations.

I performance tested returning prefix-ed lists as ***Arrays*** vs ***Tries*** today. The Trie was typically more than **4 times faster** when returning more than 15,000 words. For smaller lists, the speed of the Trie was sometimes up to **100 times faster** Unbelievable!

The ***Array*** approach takes the full dictionary as an array (approximately 272,000 words) and filters words using the ```.substring()``` method. Here is an example:

```javascript
let wordList = _dictionary;

function filterByPrefix(prefix, word) {
  const prefixLen = prefix.length;
  const isValidWordLen = word.length >= prefixLen;
  const isPrefix = word.substring(0, prefixLen) === prefix.toUpperCase();

  return isValidWordLen && isPrefix;
}

wordList = wordList.filter(filterByPrefix.bind(null, prefix));
```

The Trie approach takes the full dictionary as a Trie and filters words using depth-first recursion. Here is the method I used:

```javascript
filterByPrefix(prefix, trie = _trie) {
  prefix = prefix.toLowerCase();

  // the isPrefix method checks that every letter in the prefix exists in the trie by recursing downwards. If the prefix doesn't exist in the trie, we don't need to do anything else!
  if(!this.isPrefix(prefix)) {
    return [];
  }

  // we know that the prefix exists, so let's get the starting node
  const node = getPrefix(prefix);

  // recurse through each node in the Trie, please see the function definition below
  return recursePrefix(prefix, node);
}
```

```javascript
function recursePrefix(prefix, node, wordList = []) {
  let word = prefix;
  for(let n in node) {
    if(n === '$') {
      wordList.push(word.toUpperCase());
      word = '';
    } else {
      // if there are nodes below this node, keep recursing
      // to find words!
      recursePrefix(prefix + n, node[n], wordList);
    }
  }
  return wordList;
}
```

For more information about Tries, please click [here](http://lyndseyb.co.uk/posts/boggle-solver) to read a previous post regarding my own Boggle Solver which uses a Trie to store the dictionary.

I ran a few tests, filtering Prefixes by Array vs Trie and here are some results:

**http://localhost:8080/api/list?prefix=abb**

```json
{
  "wordsFound": 31,
  "dictionaryPrefix": "21.732ms",
  "triePrefix": "0.071ms"
}
```

**http://localhost:8080/api/list?prefix=ing**

```json
{
  "wordsFound" :  154,
  "dictionaryPrefix": "24.497ms",
  "triePrefix": "0.212ms"
}
```

**http://localhost:8080/api/list?prefix=a**

```json
{
  "wordsFound" :  15976,
  "dictionaryPrefix": "33.989ms",
  "triePrefix": "8.133ms"
}
```

As you can see, the Trie approach is much faster!

**Thoughts for Day 9:** Continue with Tries.

Any questions or comments, please use the Disqus form below! Thanks for reading!

Link to Project: [Word API](https://github.com/lyndseybrowning/word-api).
