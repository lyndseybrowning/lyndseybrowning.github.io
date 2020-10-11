---
title: "100 days of code day 6"
date: 14th January 2017
keywords: ["100 days of code"]
---

Current Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api).

On Day 6 I learned a little bit about [Express Validator](https://github.com/ctavan/express-validator).

I want my routes to be validated to prevent incorrect data types being passed and also to ensure that the correct parameters are requested.

For one of my routes, I need to validate that **at least one** of the following parameters are passed:

-   length
-   prefix
-   suffix

Users can pass any or all of the above parameters, but there must be a minimum of one passed.

I couldn't find a method to do this using express validator. As far as I could tell, you could only pass one parameter to the validator, e.g.:

```javascript
// this function will get length from the query object and will return the error message specified in the second parameter if it is not an integer
req.checkQuery("length", "Length should be a Number").optional().isInt();
```

I read about [custom validators](https://github.com/ctavan/express-validator#customvalidators) and so decided to create my own.

First, I created a new module called **customValidators** which would export an object literal containing all of my custom validators.

I created a function called **atLeastOneRequired** that would take a bunch of parameters and return true if at least one of them was not undefined. See the full module here:

```javascript
const customValidators = {
    atLeastOneRequired(...params) {
        const filter = params.filter((param) => typeof param !== "undefined");

        return filter.length > 0;
    },
};

export default customValidators;
```

The **atLeastOneRequired** function uses ES6's [rest parameter])https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters) syntax. I've talked about this in one of my older posts. If you'd like to find out more, please go [here](http://lyndseyb.co.uk/posts/es6-rest-parameters) to read the full article.

In short, `...params` is an iterable array object containing all of the parameters passed to the function and has access to native Array methods such as `.forEach`, `.reduce` and `.map` to name a few.

Using rest parameters in this instance is far better for my application because it means I can pass as many parameters as I want in each call. If I'd hardcoded the function to receive three specific parameters then realised later I needed a fourth, I'd have to modify the custom validator again.

I used my custom validator to validate the parameters like so:

**routes/\_lists.js**

```javascript
app.get("/api/lists", (req, res) => {
    const length = req.query.length;
    const prefix = req.query.prefix;
    const suffix = req.query.suffix;

    req.check(
        "length, prefix, suffix",
        "At least one parameter is required",
    ).atLeastOneRequired(length, prefix, suffix);

    const errors = req.validationErrors();

    if (errors) {
        return res.send({
            url: req.url,
            errors: errors,
        });
    }
});
```

Which returns the follow error object if none of the parameters are passed to the route:

```json
{
    "url": "/api/lists",
    "errors": [
        {
            "param": "length, prefix, suffix",
            "msg": "At least one parameter is required"
        }
    ]
}
```

**Thoughts for Day 7:** Create Prefix and Suffix routes.

Link to Project: [Dictionary API](https://github.com/lyndseybrowning/dictionary-api)
