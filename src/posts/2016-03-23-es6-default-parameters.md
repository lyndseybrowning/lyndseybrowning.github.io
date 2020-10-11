---
title: "ES6 Default Parameters"
date: 23rd March 2016
description: "Understanding ES6 default parameter syntax"
keywords: ["default parameters", "es6"]
---

In JavaScript, a parameter that is not passed to a function is undefined. Let's look at a simple example to illustrate this:

```js
function adder(a, b) {
  console.log(a); // 1
  console.log(b); // undefined, no value was passed

  return a + b;
}

adder(1); // NaN
```

Sometimes we want to apply a default value to a parameter when no value is passed in and before ES6 came about, we would do something like this:

```js
function adder(a, b) {
  b = (typeof b !== 'undefined') ? b : 1; // set b to 1 if no value is passed

  return a + b;
}

adder(1); // 2
adder(20); // 21
```

With ES6 default parameters, the above is no longer necessary. We can simply set the default value inside the head of the function, like this:

```js
function adder(a, b = 1) {
  return a + b;
}

adder(1); // 2
adder(20, 4); // 24
```

If a value for b is passed into adder, that value will be used. If no value is passed, it reverts to its default value of 1.

Here is an example of a very simple calculator that uses a default parameter.

```js
const Calculator = (sum = 0) => {

  const obj = {
    add(n) {
      sum += n;
      return this;
    },

    subtract(n) {
      sum -= n;
      return this;
    },

    multiply(n) {
      sum *= n;
      return this;
    },

    divide(n) {
      sum /= n;
      return this;
    },

    get(callback) {
      if(callback) {
        return callback(sum);
      }
      return sum;
    }
  };

  return obj;
};
```

The Calculator is a factory function that returns an object for dealing with simple calculations. We assume a starting value of 0 if no value is passed to `Calculator()`.

*Quick note*: Returning ```this``` from each function inside ```obj``` allows us to chain the calculator methods together, e.g. ``` Calculator().add(10).subtract(5); // 5 ```.

Here are some examples:

**Without a starting value**

```js
// no parameter is passed to Calculator, so on initialisation, sum is set to 0
Calculator()
  .add(10)
  .add(9)
  .add(1)
  .multiply(100)
  .divide(2)
  .get(); // 1000
```

**With a starting value**

```js
// A value of 100 is passed to Calculator, so on initialisation, sum is set to 100.
Calculator(100)
  .add(10)
  .add(9)
  .add(1)
  .multiply(100)
  .divide(2)
  .get(); // 6000
```
