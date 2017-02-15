---
layout: post
title: "Deep Cloning JavaScript Objects"
date: February 15, 2017
pageClass: post
---

I've recently been working on an [API](https://github.com/lyndseybrowning/wordapi.net) that retrieves word lists based on user parameters, some of which include length and prefix. The dictionary I am using contains approximately 270,000 words. To handle the large amount of data, I'm using a [Trie](https://en.wikipedia.org/wiki/Trie) structure to store and extract data from my dictionary.

The Trie in my application is a nested-object, with each property representing a single character. A dollar sign is used to signal the end of a word. The word CAT, for example, would be represented like this:

```
c: {
    a: {
        t: {
            $: 1
        }
    }
}
```

I'm currently learning a lot about functional programming and how functions should be pure with no side-effects. What this means is that a function shouldn't care about nor rely upon external state. Eric Elliot explains this in great detail, [here](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.j4bw5uovd).
The problem we see straight away is that Objects and Arrays in JavaScript are passed by reference. Take this example function that adds a property to an object:

```javascript
const someObject = {
  name: 'Lyndsey',
  age: 30
};

function addProperty(obj, prop, value) {
  obj[prop] = value;
  return obj;
}

const newObj = addProperty(someObject, 'sex', 'female');
console.log(newObj); // {name: "Lyndsey", age: 30, sex: "female"}
console.log(someObject); // {name: "Lyndsey", age: 30, sex: "female"}
```

As you can see, the ```addProperty()``` function does not create a new instance of the passed in object. Instead, it mutates the original object that was passed to it. So both the original array and the new array are now the same.

To solve this and to enforce immutability, we can create a clone of the object passed in to the ```addProperty()``` method and add the value to the cloned object instead of the original object.

To clone objects, I normally use the [Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method or [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator). (Note: spread syntax is a part of ECMAScript 2017 and is not officially standardised).

Here are some examples using both techniques:

```javascript
const obj = {
  name: 'Lyndsey',
  age: 30
};

const obj2 = Object.assign({}, obj);
obj2.age = 31;

// using spread syntax
const obj3 = { ... obj2 };
obj3.name = 'Jane';

console.log(obj);  // { name: "Lyndsey", age: 30} }
console.log(obj2); // { name: "Lyndsey", age: 31 }
console.log(obj3); // { name: "Jane", age: 30 }
```

We now have multiple clones of the object that do not affect or mutate the original object.

Whilst building up the Trie module, I decided to create an ```addWord()``` function that would take an existing Trie data structure and a word to add to it. Seemed easy enough. Rather than mutate the existing Trie structure, I could clone it, add the new word and return the new Trie without affecting the existing one.

I was wrong. Here is an example of what I created:

```javascript
const trie = {
  c: {
    a: {
      t: {
        $: 1
      }
    }
  }
};

function addWord(trie, word) {
  const cloned = { ...trie };
  const letters = word.toLowerCase().split('');

  let currentNode = cloned;

  letters.forEach((letter, index, array) => {
    currentNode[letter] = currentNode[letter] || {};
    currentNode = currentNode[letter];

    if(index === array.length - 1) {
      currentNode.$ = 1;
    }
  });

  return cloned;
};

// add the word cats to the trie
const newTrie = addWord(trie, 'cats');
```

For some reason, the original array was being mutated:

```javascript
console.log(JSON.stringify(newTrie, null, 2));
console.log(JSON.stringify(trie, null, 2));
```

Both produced the following output:

```json
{
  "c": {
    "a": {
      "t": {
        "$": 1,
        "s": {
          "$": 1
        }
      }
    }
  }
}
```

How could this be happening? Why was my original object being mutated?

After a frustrating 30 minutes or so, I went to the Internet to find out more about ```spread``` and ```Object.Assign``` syntax. After a bit of reading, I found that these methods only perform a **shallow** copy of the source object or array and only the first layer of data will be copied. Any nested properties or items will remain referenced to the original source and thus any operations on this data will force the original source to be mutated.

Now that I knew this, I needed a way to deep-clone my object. The most obvious method I thought was a loop through the original object to build up a new object:

```javascript
function cloneObject(obj) {
  const clone = Object.keys(obj).reduce((acc, prop) => {
  	acc[prop] = obj[prop];
    return acc;
  }, {});

  return clone;
};
```

I tested it and it worked:

```javascript
const trie = {
  c: {
    a: {
      t: {
        $: 1
      }
    }
  }
};

const newTrie = cloneObject(trie);
newTrie.x = 1;

// trie
{
  "c": {
    "a": {
      "t": {
        "$": 1
      }
    }
  }
}

// newTrie
{
  "c": {
    "a": {
      "t": {
        "$": 1
      }
    }
  },
  "x": 1
}
```

However, I also found another, simpler method for deep-cloning objects:

```javascript
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

In one line of code, we can deep-clone an object without changing the state of the original object. ```JSON.stringify()``` method converts the object to a string then parses it back to an object using ```JSON.parse()```. Whilst this is not the most reliable technique (e.g. there'll be problems if the object contains properties that aren't serialisable), this is a good hack for serialisable properties.

To see more of the project, please visit my [GitHub repository](https://github.com/lyndseybrowning/trie-prefix). For any questions, please use the Disqus comments below.

Thanks for reading.
