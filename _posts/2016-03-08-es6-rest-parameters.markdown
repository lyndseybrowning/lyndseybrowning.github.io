---
layout: "post"
title: "ES6 Rest Parameters"
date: "2016-03-08 20:10"
pageClass: post
---

With ES6 being the latest JavaScript standard, I've recently been familiarising myself with some of its new features.

This post is going to talk about Rest Parameters and how they can nicely replace the ``` arguments ``` object.

Let's say we have an ``` adder() ``` method that takes any number of arguments and adds them together.

Before ES6, I would have created something like this:

{% highlight javascript %}
function adder() {
  var sum = 0;
  for(var i = 0; i<arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

adder(1, 2, 4);    // 7
adder(1, 10);      // 11
adder(2, 4, 6, 8); // 20

{% endhighlight %}

Whilst a for loop is a decent solution, I prefer to use native ES5 methods such as ```.forEach()``` and ```.map()``` to iterate over an array. For me, these methods are far more readable and better represent the intent of the function or current context.

Unfortunately, the ```arguments``` object is not an Array. It is an array-like object which means it has a ``` .length ``` property but does not have any native properties such as ```.forEach()```.

{% highlight javascript %}
function adder() {
  var sum = 0;
  arguments.forEach(function(n) {
    sum += n;
  });
  return sum;
}

adder(1, 2, 4); // Uncaught TypeError: arguments.forEach is not a function
{% endhighlight %}

To get around this, I would use ``` .call() ``` to bind the arguments object as the ```this``` argument to the forEach function.

{% highlight javascript %}
function adder() {
  var sum = 0;
  [].forEach.call(arguments, function(n) {
    sum += n;
  });
  return sum;
}

adder(1, 2, 4); // 7
{% endhighlight %}

Whilst the above method is a nice solution, ES6 Rest Parameters makes this even nicer.

Rest Parameters take the following format: ``` ...params ```, three dots followed by the name of the parameters. We can pass this into a function like we would any parameter:

{% highlight javascript %}
function adder(...params) {
  var sum = 0;
  params.forEach(function(n) {
    sum += n;
  });
  return sum;
}

adder(1, 2, 4); // 7
{% endhighlight %}

What makes them different and great, is that they are array instances and can therefore access array properties without the need for any prior conversion.

In addition to this, whilst the ```arguments``` object contains details about *all* parameters passed to the function, rest parameters only care about parameters that were not explicitly named.

*Using Rest Params*
{% highlight javascript %}
function adder(a, b, ...params) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(params); // [3, 4, 5]
}

adder(1, 2, 3, 4, 5);
{% endhighlight %}

*Using the arguments object*
{% highlight javascript %}
function adder(a, b) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(arguments); // [1, 2, 3, 4, 5]
}

adder(1, 2, 3, 4, 5);
{% endhighlight %}
