---
title: Boggle solver
date: 30th December 2016
description: Boggle solver
keywords: ["boggle solver", "boggle", "javascript"]
---

This post describes how I built my own Boggle solver, using JavaScript.

I've been a big [Boggle](https://en.wikipedia.org/wiki/Boggle) fan for many years, having played numerous variations of the game online since the 90's. You can see me play a version of the game - Wordament, [here](https://www.youtube.com/watch?v=PjC3Vbgva8k).

Whilst always striving to be a better player, I'm also an avid programmer with a big interest in JavaScript. So I thought, why not challenge myself to create a boggle solver which would not only be a challenge programming-wise but a useful learning resource. My advice to those looking to improve in the game is to always look at the full word list at the end of a game. Keep doing that and the words will eventually sink in.

For those who don't want to read about how I created the solver, you can go straight to the solver at this link: [http://lyndseyb.co.uk/boggle-solver/](http://lyndseyb.co.uk/boggle-solver/).

The solver is made up of a few parts:

- [Board Generation](#board-generation)
- [Trie Structure](#trie-structure)
- [Solver](#solver)

<br>

## Board Generation

I didn't want to restrict the solver to the standard 4x4 grid size, so I wrote the functionality to allow any grid size from 3x3 up to 8x8. I went as far as an 18x18 grid at one point, which was fun, but that's something for another day.

This part of the process was simple; I needed to generate a list of inputs on the screen in grid format. To handle the view, I created a list of fractions and used Sass to calculate the widths for me automatically:

```scss
$fractions: (
    "1/1": 1/1,
    "1/2": 1/2,
    "1/3": 1/3,
    "2/3": 2/3,
    "1/4": 1/4,
    "2/4": 2/4,
    "3/4": 3/4,
    "1/5": 1/5,
    "2/5": 2/5,
    "3/5": 3/5,
    "4/5": 4/5,
    "1/6": 1/6,
    "2/6": 2/6,
    "3/6": 3/6,
    "4/6": 4/6,
    "5/6": 5/6,
    "1/7": 1/7,
    "2/7": 2/7,
    "3/7": 3/7,
    "4/7": 4/7,
    "5/7": 5/7,
    "6/7": 6/7,
    "1/8": 1/8,
    "2/8": 2/8,
    "3/8": 3/8,
    "4/8": 4/8,
    "5/8": 5/8,
    "6/8": 6/8,
    "7/8": 7/8,
) !default;

@function str-replace($string, $find, $replace-with: "") {
    $index: str-index($string, $find);

    @if $index {
        @return str-slice($string, 1, $index - 1) + $replace-with + str-slice($string, $index +
                    1);
    }

    @return $string;
}

@each $key, $fraction in $fractions {
    $key: str-replace($key, "/", "\\/");

    .u-#{$key} {
        width: $fraction * 100%;
    }
}
```

Producing CSS that looks like this (**note** the forward slashes have to be escaped in the CSS for the property name to be valid):

```css
.u-1\/1 {
    width: 100%;
}

.u-1\/2 {
    width: 50%;
}

.u-1\/3 {
    width: 33.3333%;
}
```

and so on...

The techniques used to generate the CSS was highly influenced by [Nebula CSS](https://github.com/rbrtsmith/nebula-css), by [Robert Smith](http://rbrtsmith.com/). I'd highly recommend if you're looking for a extensible and scalable Sass/CSS framework built upon ITCSS.

Onto the JavaScript, this was relatively easy. All I needed to do was create a nested loop to generate the HTML based on the board size entered by the user. I created some default boards in a settings file to populate them automatically, saving me a lot of time. I decided to keep the default boards in there; makes for some nice word lists (especially the 4x4, with 1400+ words). Here is a snippet:

```javascript
let rows = 0;
let strBoard = "";
let defaultLetters = [];
let hasDefaultLetters = false;

if (settings.defaultBoards.hasOwnProperty(numRows)) {
    hasDefaultLetters = true;
    defaultLetters = settings.defaultBoards[numRows].split(" ");
}

while (rows < numRows) {
    let cols = 0;
    while (cols < numCols) {
        strBoard += `<div class="o-grid__col u-1/${numRows}"><input type="text" maxlength="1" data-letter class="c-boggle__tile" value="${
            hasDefaultLetters ? defaultLetters[rows][cols] : ""
        }"></div>`;
        cols++;
    }
    rows++;
}
```

## Trie Structure

I had a dictionary with over 260,000 words. I was familiar with [Tries](https://en.wikipedia.org/wiki/Trie) having used one for one of my older games, [Wordscrambler](http://word-scrambler.co.uk/) so I went with this approach versus using a Database or storing all entries in a large array. Tries make for some really fast depth-first searching, the default 4x4 board finds 1435 words in approximately 48ms!

I created a module to handle the Trie. I needed methods for generating the trie, checking to see if a word exists and checking if a prefix is valid. No need to recurse combinations that don't exist in the Trie!

To create the Trie, I read in the dictionary as a txt file, reading each line to the Trie. Here's the method I used for adding a new word to the Trie:

```javascript
if (word == null || word === "") {
    return;
}

let currentNode = trie;
word.toLowerCase()
    .split("")
    .forEach((letter, index) => {
        if (!currentNode[letter]) {
            currentNode[letter] = {};
        }
        // reached the end of the word?
        if (index === word.length - 1) {
            currentNode.$ = 1;
        } else {
            currentNode = currentNode[letter];
        }
    });
```

If we input the words _dog_ and _dogs_ this is how it would look in Trie format:

```javascript
{
  d: {
    o: {
      g: {
        $: 1,
        s: {
          $: 1
        }
      }
    }
  }
}
```

As you can see, the searching mechanism for the Trie is super fast because we only need to check one letter at a time and recurse downwards. If we are looking for the word _cat_, we can see straight away that the object doesn't contain the letter _c_ so we can disregard that word completely and exit the function.

To view the Trie module in full, click [here](https://github.com/lyndseybrowning/boggle-solver/blob/master/src/js/trie.js).

## Solver

This was the most challenging part for me. I've played Boggle for more than half of my life, but never had to solve the algorithm. I started with what I thought was the easiest part; inputting a position in the board and producing the valid adjacent positions. I wrote a JsFiddle originally to demonstrate this, [check it out](https://jsfiddle.net/LyndseyB/ch9tfhgr/2/).

For the final solver, I needed to expand my original method to disregard letters that may have already been used. This is the final method I used:

```javascript
const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

function getAdjacentLetters(currentWord, position, usedPositions) {
    const _directions = directions.slice(0);
    const [row, col] = position;

    return _directions.reduce((acc, direction) => {
        const [x, y] = direction;
        const rowSum = x < 0 ? row - Math.abs(x) : row + x;
        const colSum = y < 0 ? col - Math.abs(y) : col + y;

        if (
            rowSum >= 0 &&
            colSum >= 0 &&
            rowSum < boardSize &&
            colSum < boardSize
        ) {
            let adjacent = [rowSum, colSum];
            let adjacentWord = currentWord + boardMatrix[rowSum][colSum];

            if (
                !utils.arrayMatch(usedPositions, adjacent) &&
                trie.isValidPrefix(adjacentWord)
            ) {
                acc.push(adjacent);
            }
        }
        return acc;
    }, []);
}
```

The second step was to solve the board. I read a few articles and watched a few YouTube videos explaining how one would go about solving a boggle board and I came up with the following method:

```javascript
function solveBoard(currentWord, currentPosition, usedPositions = []) {
    const [row, col] = currentPosition;
    const positionsCopy = usedPositions.slice();

    if (
        currentWord.length >= minLength &&
        trie.containsWord(currentWord) &&
        !utils.inArray(wordsFound, currentWord)
    ) {
        wordsFound.push(currentWord);
    }

    const adjacents = getAdjacentLetters(
        currentWord,
        currentPosition,
        usedPositions,
    );

    adjacents.forEach((adjacent) => {
        positionsCopy.push(currentPosition);
        const [x, y] = adjacent;
        const letter = boardMatrix[x][y];
        const word = currentWord + letter;

        solveBoard(word, adjacent, positionsCopy);
    });
    return;
}
```

For each letter in the grid, I called the solveBoard method. Each letter and it's position in the board would be passed in. The `getAdjacentLetters()` method would calculate the current letter's adjacent letters and would loop each of those in turn, appending to the currentWord.

What took me a while to get right was the `usedPositions` variable. I needed to ensure that each time I recursed over a letter, it had to be marked as used so that it couldn't be visited again. I wrote a simple method that would pass in all used positions and check the current position against them:

```javascript
/// checks if two arrays are exactly the same
// e.g. [1,1] === [1,1], [1,0] !== [1,1]
arrayMatch(first, second) {
	return first.some((item) => {
 		return item.every((x, index) => {
    	return x === second[index];
    });
  });
},
```

Once the `usedPositions` variable was in place, the code was pretty much completed. The only other thing I needed to do was check on each recursion that the current word existed in the dictionary, and if so, I pushed it into the list of found words.

For the full source code, please click [here](https://github.com/lyndseybrowning/boggle-solver).

For the live solver, please click [here](http://lyndseyb.co.uk/boggle-solver/).

Thanks for reading!
