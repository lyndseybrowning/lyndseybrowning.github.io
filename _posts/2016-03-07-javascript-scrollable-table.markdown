---
layout: post
title: "JavaScript Scrollable Table Plugin"
date: March 7, 2016
pageClass: post
---

I recently had a client who wanted to scroll their tabular data without losing focus of the table header.

My first thought was to do this using CSS by adding an overflow property to the <tbody> element and setting the element's display property to block to
allow it to scroll. Unfortunately, this method didn't work at all in IE9 and since we need to support that browser, I needed a different solution. So I decided to write my own.

The plugin takes a standard HTML table and separates the header and body elements into their own table. A wrapper around both tables holds everything together.

By separating out the header and the body elements into their own tables, I needed to match the row widths to their respective columns.

I used Javascript's ``` .map() ``` function to query each cell in the first row of scrollable content.

{% highlight javascript %}
let cellsWrap = el.querySelector('.js-scroll-wrap-inner table tr');
let widths = [].map.call(cellsWrap.children, function(cell) {
  return cell.offsetWidth;
});
{% endhighlight %}

I then used a ``` .forEach() ``` function to loop through the table header cells and match up the widths accordingly. However, I needed to take into account the width of the scrollbar, so the last cell is adjusted accordingly.

{% highlight javascript %}

[].map.call(headWrap.children, function (cell, index) {
  if (index === widths.length - 1) {
    cell.style.width = widths[index] + scrollbar + 'px';
  } else {
    cell.style.width = widths[index] + 'px';
  }
});

{% endhighlight %}

The plugin has two default options that can be overridden as necessary:

{% highlight javascript %}
{
  width: null, // corresponding to the width of the table element, in px or %
  height: 300 // the height of the scrollable content
}
{% endhighlight %}

You can find a demo of this plugin [here]([http://demos.lyndseyb.co.uk/tablescroll/) and the full source code can be found on my [GitHub](https://github.com/lyndseybrowning/js-table-scroller).
