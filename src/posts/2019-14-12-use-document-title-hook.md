---
title: "Creating a useDocumentTitle hook"
description: "Creating a custom hook to set a document title"
date: "14th December 2019"
keywords: ["react hooks", "custom hooks"]
---

# Creating a useDocumentTitle custom hook

When working with multiple pages in a React application, at some point you will need to set the [document title](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) to describe the page being viewed by your end user, and to provide an accessible experience for screen reader users.

So how can we do this in a React application? Before the introduction of React Hooks in version 16.8, there were two common approaches, the first using [react-helmet](https://github.com/nfl/react-helmet) and the second using the `componentDidMount` lifecycle method.

Let's look at an example using `componentDidMount`:

```javascript
import React, { Component } from "react";

class App extends Component {
    componentDidMount() {
        document.title = "My page title";
    }

    render() {
        return <p>My Component</p>;
    }
}
```

Whilst this method is concise, we can make it even better using Hooks.

[React hooks](https://reactjs.org/docs/hooks-intro.html) were released in React 16.8. So what are they? In a nutshell, they provide a way of using state and lifecycle without writing a class component.

Let's implement our previous example using hooks:

```javascript
import React, { useEffect } from "react";

const App = () => {
    useEffect(() => {
        document.title = "My page title";
    }, []);

    return <p>My Component</p>;
};
```

Instead of writing a class component, we can now write our component as a function, saving a number of lines of code.

The `useEffect` function can be imported directly from `React`. It is a combination of the following class lifecycle methods:

-   `componentDidMount`
-   `componentDidUpdate`
-   `componentWillUnmount`

The first argument to `useEffect` is a function, the effect you want to perform after your component has rendered. It is typically used to perform data-fetching from an API.

`useEffect` runs after the first render of a component, and subsequently after every update. Sometimes, you only want the effect to run once, for example when setting a document title. This will have small performance gains as our effect will not be run on every update. To do this, we can pass an empty array as the second argument to `useEffect`. This is now the equivalent of using `componentDidMount` in class components.

```javascript
useEffect(() => {
    document.title = "My page title";
}, []); // Only run this code once
```

But what does the array do?

In class components, we use `componentDidUpdate` with a comparison condition to determine whether our effect should be run:

```javascript
componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
         document.title = `You are on page: ${this.state.page}`;
    }
}
```

The array we pass as the second argument of `useEffect` can be used to skip effects if values haven't changed, simplifying the `componentDidUpdate` method above:

```javascript
useEffect(() => {
    document.title = `You are on page: ${page}`;
}, [page]); // Only re-run this effect if page changes
```

Now, whenever our component rerenders, it will only ever set our document title when the value of `page` is different to what it was previously.

## Refactoring to use a custom hook
