---
layout: post
title: "#100DaysofCode - Day 8"
date: January 16, 2017
pageClass: post
---

Current Project: [Word API](https://github.com/lyndseybrowning/word-api).

I renamed the project today because I think **word-api** better reflects what the API does. It doesn't store word definitions like a typical dictionary would do; it simply returns filtered lists and permutations.

I performance tested returning prefix-ed lists as ***Arrays*** vs ***Tries*** today. The Trie was typically more than **4 times faster** when returning more than 15,000 words. For smaller lists, the speed of the Trie was sometimes up to **100 times faster**. Unbelievable!

The ***Array*** approach takes the full dictionary as an array (approximately 272,000 words) and filters words using the ```.substring()``` method. Here is an example:

```javascript
let wordList = _dictionary; // array containing 272,000 words

function filterByPrefix(prefix, word) {
  const prefixLen = prefix.length;
  const isValidWordLen = word.length >= prefixLen;
  const isPrefix = word.substring(0, prefixLen) === prefix.toUpperCase();

  return isValidWordLen && isPrefix;
}

wordList = wordList.filter(filterByPrefix.bind(null, prefix));
```

The Trie approach takes the full dictionary as a Trie and filters words using depth-first recursion. Here is an example of what a Trie looks like:

```javascript
// this trie contains the words: CAR and CARS. The '$' symbol signifies the end of a word.
{
  C: {
    A: {
      R: {
        $: 1,
        S: {
          $: 1
        }
      }
    }
  }
}
```

For more information on Tries, see this link: [https://en.wikipedia.org/wiki/Trie](https://en.wikipedia.org/wiki/Trie). 

Here is the method I used to recurse the Trie:

```javascript
filterByPrefix(prefix, trie = _trie) {
  prefix = prefix.toLowerCase();

  // the isPrefix method checks that every letter in the prefix exists in the trie by recursing downwards. If the prefix doesn't exist in the trie, we don't need to do anything else!
  if(!this.isPrefix(prefix)) {
    return [];
  }

  // we know that the prefix exists, so let's get the starting node
  // node in this instance is every key underneath the last letter in the prefix.
  // If we'd passed in C as the prefix, the resulting node would be every object nested inside C, 
  // so using the example Trie above, the next node would be the letter A.
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

For the full Trie module used in this API, please see this link: [https://github.com/lyndseybrowning/word-api/blob/master/src/trie.js](https://github.com/lyndseybrowning/word-api/blob/master/src/trie.js)

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
