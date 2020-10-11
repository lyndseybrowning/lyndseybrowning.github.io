---
title: JavaScript Prefix Tree
date: 20th February 2017
description: JavaScript implementation of a prefix tree 
keywords: ["trie", "prefix tree", "javascript", "npm package"]
---

A few days ago I published my first ever [npm package](https://www.npmjs.com/package/trie-prefix-tree), a JavaScript implementation of a Trie data storage model.

## What is a Trie?

A Trie is a model for storing strings in a tree-like structure. Each branch in the tree represents a single character which allows for fast, depth-first searching. If we had a dictionary with the words CAR, CAT and CURL, we could visualise the Trie like this:

![Trie model](/img/trie.jpg)

Because **CA** is a prefix for both **CAT** and **CAR**, the T and R can become child branches of the **CA** prefix. [Wikipedia](https://en.wikipedia.org/wiki/Trie) has a good explanation of Tries, for more information.

## What does it do?

The Trie takes a predefined dictionary (e.g. an array of words) and performs operations on it such as prefix matching, searching and checking the existence of a string. Because the data is modeled in a Trie, we can find results quickly.

## Why is it fast?

Let's say we had an array of 100,000 words and we wanted to check that the prefix **A-** existed, i.e. strings that begin with the letter **A**. Using an array, we'd need to run a function against **every** item in the array to filter out valid prefixes. Perhaps something like this:

```javascript
const array = ["cat", "dog", "lion", "tiger"];

const filterByPrefix = function (prefix, array) {
    return array.filter((val) => {
        return val.substring(0, prefix.length) === prefix;
    });
};

fiterByPrefix("c", array); // ['cat'];
```

The Trie on the other hand is far more efficient because instead of searching every possible item, we simply validate each character in turn against the Trie, storing the current position in the Trie as we recurse downwards to the next letter.

If we were to search the Trie illustrated in the image above for the prefix **ABBR-**, we'd only need to perform one iteration, because the letter **A** does not exist at the root level. So after one iteration, we can break out of our loop and conclude that the prefix does not exist, without having to recurse through the whole model.

## How can I use it?

It is available as an [npm package](https://www.npmjs.com/package/trie-prefix-tree). To install, simply:

```javascript
npm install trie-prefix-tree --save
```

Once added to your package dependencies, you can import the module using Node's `require()` method:

```javascript
const trie = require("trie-prefix-tree");
```

Or by using ES2015 Modules, if that's what you prefer:

```javascript
import trie from "trie-prefix-tree";
```

Then, you need to instantiate the Trie with a predefined dictionary, e.g.

```javascript
import trie from "trie-prefix-tree";

const myTrie = trie([
    "dog",
    "cat",
    "lion",
    "bear",
    "parrot",
    "koala",
    "kitten",
]);
```

Once you've instantiated the Trie, you can perform different operations on it, such as checking a prefix exists:

```javascript
myTrie.isPrefix("k"); // true
myTrie.isPrefix("ba"); // false
```

Retrieving a list of words with the given prefix:

```javascript
myTrie.getPrefix("k"); // ['kitten', 'koala']
myTrie.getPrefix("par"); // ['parrot']
```

Retrieving a full list of words in the Trie:

```javascript
myTrie.getWords(); // ['dog', 'cat', 'lion', 'bear', 'parrot', 'koala', 'kitten']
```

You can also add and remove items from the Trie, and these methods can be chained:

```javascript
myTrie.addWord("husky").removeWord("dog");
myTrie.getWords(); // ['bear', 'cat', 'husky', 'kitten', koala', lion', 'parrot']
```

You can even retrieve anagrams and sub-anagrams of given letters:

```javascript
myTrie.getAnagrams("noil"); // ['lion']
myTrie.getSubAnagrams("racetb"); // ['bear', 'cat']
```

When you have a large amount of data, Tries are very powerful and can be used to perform fast and efficient retrievals.

If you wish to contribute to the project, you can find it over on GitHub [here](https://github.com/lyndseybrowning/trie-prefix-tree). Feel free to add suggestions, ask questions or submit an issue.

Thanks for reading.
