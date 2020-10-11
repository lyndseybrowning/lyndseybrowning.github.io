---
title: "100 days of code day 19 & 20"
date: 29th January 2017
keywords: ["100 days of code"]
---

Current Project: [wordapi.net](https://github.com/lyndseybrowning/wordapi.net).

I skipped my first day yesterday. I spent the day visiting family so didn't get a chance to turn the computer on. I'm back today with my progress from Days 19 and 20.

Up until now, I've created an Express server that loads in a dictionary and filters it based on requested parameters such as length, prefix and suffix.

I decided it was time to start unit testing. My test framework of choice is [Mocha](http://mochajs.org/#getting-started) and I've chosen [Chai](http://chaijs.com/) as the assertion library. For anyone who is looking for a good read about test driven development, click to read [5 Common Misconceptions about TDD Unit Tests](https://medium.com/javascript-scene/5-common-misconceptions-about-tdd-unit-tests-863d5beb3ce9#.gxplxgyw4) by [Eric Elliott](https://medium.com/@_ericelliott).

Even though I've already written a lot of code up until now, I've decided that I'll start afresh and I'll write my modules around the unit tests, rather than alter my current code to suit the test.

This is the common approach to test-driven development:

1. Create a failing test.
2. Create the application code that passes the test.
3. Refactor the application code to either optimise or simplify whilst ensuring the test still passes.

I started with the main module: the dictionary. The dictionary module stores the whole dictionary as an array and handles methods such as initialisation and filtering words by length. The trickiest part was knowing which tests to write. I ended up with something like this:

```
describe('Dictionary', () => {
	describe('#init()', () => {
    it('should return an array');
    it('should not return an empty array');
  });

  describe('#get()', () => {
    it('should return an array');
    it('should return an instance of the dictionary created by init()');
  });

  describe('#filterByLength()', () => {
    it('should return an array');
    it('should return an array of words filtered by length';
    it('should not modify the global dictionary array';
  });

  describe('#filterByPrefix()', () => {
    it('should not modify the global dictionary array');
    it('should accept a parameter of type String');
    it('should return an array of words that start with the requested prefix');
  });

  describe('#filterBySuffix()', () => {
    it('should not modify the global dictionary array');
    it('should accept a parameter of type String');
    it('should return an array of words that end with the requested suffix');
  });
});
```

Each `it` block begins with the word `should` so that the test is a readable sentence e.g. `it should return an array`.

The dictionary module will have multiple methods, so I decided to structure my code with multiple `describe` blocks, one for each separate method. This should give me a nice readable output when running the tests. I also created the template for the dictionary module that would be filled after each failing test:

```javascript
import path from "path";
import fs from "fs";
import config from "./config";

const dictionary = function () {
    const words = [];

    return {
        init() {},

        get() {},

        filterByLength(length, dictionary = words) {},

        filterByPrefix(prefix, dictionary = words) {},

        filterBySuffix(suffix, dictionary = words) {},
    };
};

export default dictionary();
```

So far, I had 13 pending tests and a template for my dictionary module. Now I had to create the tests themselves. To do this, I needed to import Chai's expect library and the module that would eventually become the dictionary.

```
import { expect } from 'chai';
import dictionary from '../src/dictionary';
```

I also used Mocha's `beforeEach` method to initialise the dictionary before each test run, so that each test could reference the dictionary without having to recreate it each time:

```
describe('Dictionary', () => {
  let words;

  beforeEach(() => {
    words = dictionary.init();
  });
});
```

I started with the first method, the `init()` method, which will be responsible for reading an existing txt file into an array.

To create the failing test, I created the following code:

```
describe('#init()', () => {
  it('should return an array', () => {
    expect(words).to.be.a('array');
  });

  it('should not return an empty array', () => {
    expect(words.length).not.equal(0);
  });
});
```

When I run the tests in my console, both tests failed, since the init() method doesn't actually return anything yet. In order to make the tests pass, I created the application code:

```javascript
const dictionary = function() {
  const words = [];

  return {
    init() {
      if(words.length) {
        return words;
      }

      const file = path.join(__dirname, config.dictionary.sowpods);
      const array = fs.readFileSync(file).toString().split('\r\n');

      return array;
    }.
};
```

The `init` method returns the existing words array if it has already previously been initialised. When empty, I use Node's file system object to read the file into an array. When I run the tests again, I received a passing output:

```
Dictionary
    #init()
      ✓ should return an array
      ✓ should not return an empty array
```

I followed the same process for the `get()` and `filterByLength()` methods:

```
describe('#get()', () => {
  it('should return an array', () => {
    expect(dictionary.get()).to.be.a('array');
  });

  it('should return an instance of the dictionary created by init()', () => {
    expect(dictionary.get().length).to.equal(words.length);
  });
});

describe('#filterByLength()', () => {
  it('should return an array', () => {
    const actual = dictionary.filterByLength(10);

    expect(actual).to.be.a('array');
  });

  it('should return an array of words filtered by length', () => {
    const words = ['BOAT', 'CAR', 'BUS'];
    const length = 3;
    const expected = ['CAR', 'BUS'];
    const actual = dictionary.filterByLength(length, words);

    expect(expected).to.deep.equal(actual);
  });

  it('should not modify the global dictionary array', () => {
    const filtered = dictionary.filterByLength(10);
    const get = dictionary.get();

    expect(get.length).to.equal(words.length);
  });
});
```

Then created the application code:

```javascript
#get()
  ✓ should return an array (60ms)
  ✓ should return an instance of the dictionary created by init()
#filterByLength()
  ✓ should return an array
  ✓ should return an array of words filtered by length
  ✓ should not modify the global dictionary array (45ms)
```

I still have some pending tests which I'll carry on with today and tomorrow. I'm enjoying learning about Unit Testing and feel like the trickiest part is knowing which tests to write. I guess that will come with practise. For now, I'll carry on learning as much as I can.

Thanks for reading! Please ask questions or leave comments in the box below, and if you'd like to follow the project, please click on this link: [https://github.com/lyndseybrowning/wordapi.net](https://github.com/lyndseybrowning/wordapi.net).
