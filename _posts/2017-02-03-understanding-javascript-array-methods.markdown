---
layout: post
title: "Understanding JavaScript Array Methods"
date: February 03, 2017
pageClass: post
---

ECMAScript 5.1 (ES5) saw the introduction of many new JavaScript Array methods, some of which include:

- [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

These methods are higher-order functions (functions that accept functions as arguments). They take a callback function as an argument and apply it to each item in the given array. Here's an example:

```javascript
const array = [1, 2, 3, 4, 5];

array.forEach(function(item) {
  // log each item to the console
  console.log(item);
});
```

What's good about this is that we don't have to tie the callback function to the forEach method. It's just a function after all, so we can extract it just as we would any function:

```javascript
const array = [1, 2, 3, 4, 5];
const logArrayItem = function(item) {
  console.log(item);
};

array.forEach(logArrayItem);
```

We've not only made this more readable, we've given ourselves the opportunity to re-use code. The ```logArrayItem``` function can now be used in other methods throughout the program.

I've been using these methods for a while in my day job. I love how much cleaner they are than standard ```for``` loops and how they enforce immutability (producing a new array from the input rather than working on the original array). It's also handy to be able to chain the methods together, for example:

```javascript
const array = [1, 2, 'a', 3, 'b', 4, 5, 'c'];
const doubled = array
  // remove non-numeric values first
  .filter(item => typeof item === 'number')
  .map(number => number * 2);

console.log(doubled); // [2, 4, 6, 8, 10]
```

When I first started using some of these methods I never really fully understood how they worked. The callback function was particularly confusing for me as I wasn't used to seeing JavaScript this way. So in order to fully grasp the idea behind each method, I decided to recreate them myself. Here are some of my solutions:

**forEach**

The forEach method iterates over an array and executes a callback function on each item.

From this I knew that I needed a function that takes two arguments:

- an array
- a function that is executed for each item in the array


```javascript
const forEach = (array, fn) => {
  // iterate over each item in the array
  // and execute the callback function
};
```

The next step was to iterate over the passed in array and execute the callback function. I did this using a standard for-loop:

```javascript
const forEach = (array, fn) => {
  for(let i = 0, len = array.length; i < len; i++) {
    // execute the callback function
    // pass the current array item as the first argument
    // pass the current index as the second argument
    // pass the original array as the third argument
    fn(array[i], i, array);
  }
};
```

I now had my own ```forEach``` method! I tested my method:

```javascript
forEach([1,2], (item) => {
  // 1 then 2 is logged as expected!
	console.log(item);
});
```

By recreating the function myself I was able to fully understand what the method was doing and it allowed me to learn more about callback functions.

I reiterated the same process for some of the other methods. Here is my implementation of the ```map()``` method, which iterates an array and transforms each of its values based on the callback specified, returning a new transformed array:

**map**

```javascript
const map = (array, fn) => {

  // this method is the same as forEach but it returns a new array
  // so we need to create it!
  const mapped = [];

  for (let i = 0, len = array.length; i < len; i++) {

    // for each item in the array, execute the callback and push the result
    // of the callback into the new mapped array
    mapped.push(fn(array[i], i, array));
  }

  // once we've finished looping,
  // return the newly transformed array
  return mapped;
};

const array = [1, 2, 3, 4, 5];
const doubleAll = map(array, item => item * 2);

console.log(doubleAll); // [2, 4, 6, 8, 10]
```

I was now getting the hang of this! My understanding was far greater. My final challenge was to recreate the ```Array.reduce``` method. This was the toughest.

The ```Array.reduce``` method ***reduces*** (it's in the name!) an array down to a **single** value. However, this method is different to other methods like ```map``` and ```filter``` because the output is determined by the user. An array can be reduced down to a string, an object or even a number. Let's look at a simple example that takes an array and sums its values:

```javascript
const array = [1, 2, 3, 4, 5];

const sum = array.reduce((total, current) => {
  return total + current;
}, 0);
```

The **second** parameter (0 in the above example), is the the **initial value**. This is the data type that the reduce method will return. In the example we are summing the items in the array, so it makes sense that we'd need to start with a 0.

As before, in order to recreate the reduce method I knew that I'd need an initial array, a callback function to be performed on each item and an initial value.

```javascript
const reduce = (array, fn, accumulator) => {

};
```

I called the initial value the accumulator, because that's what the reduce method does. When it performs an action on the current item in the array, it returns the **result** of that action to the next iteration, so each iteration has an accumulation of previous executions.

The sum example can be visualised like this:

```javascript
const array = [1, 2, 3, 4, 5];
const sum = array.reduce((total, current) => {
  return total + current;
}, 0);

// first iteration: total is the initial value, 0, current is 1
// 0 + 1 is passed to the next iteration

// second iteration: total is now 1, current is 2
// 1 + 2 is passed to the next iteration

// third iteration: total is now 3, current is 3
// 3 + 3 is passed to the next iteration..

// and so on until the end of the array is reached
```

What I gathered from this was that my reduce function needed to set the accumulator on each iteration to the result of the executing callback function.

My implementation of the reduce method looks like this:

```javascript
const reduce = (array, fn, accumulator) => {
  for (let i = 0, len = array.length; i < len; i++) {
    // accumulator is equal to the result of the callback function
    // we also need to pass the current accumulator into the callback function
    // along with the current array item, the index and the original array
    accumulator = fn(accumulator, array[i], i, array);
  }

  // the accumulator is returned once the loop has finished
  return accumulator;
};
```

I tested it with a few different examples, and it worked!

```javascript
const array = [1, 2, 3, 4, 5];
const sumReduce = reduce(array, (acc, cur) => acc + cur, 0);
const reduceToString = reduce(array, (acc, cur) => acc += cur, '');

console.log(sumReduce); // 15
console.log(reduceToString); // 12345
```

I now feel I have a solid grasp on Array methods and their inner workings. To access some of the other Array methods, please visit my GitHub repository here: [https://github.com/lyndseybrowning/javascript-snippets](https://github.com/lyndseybrowning/javascript-snippets).

Please ask questions or give feedback using the Disqus comment form below and thanks for reading!
