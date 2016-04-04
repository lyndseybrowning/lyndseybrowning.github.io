---
layout: post
title: "Creating a nested list view using React"
pageClass: post
---

This post details how to create a nested list using React.

You can find a working demo [here](https://jsbin.com/jatohodive/edit?js,output).

A nested list can be created in a few minutes using standard HTML. I'll use a simple organisational structure as an example:

{% highlight html %}
<ul>
  <li> Managing Director
    <ul>
      <li> Sales Director </li>
      <li> IT Director
        <ul>
          <li> Technical Lead
            <ul>
              <li> Software Developer </li>
              <li> Support Technicial </li>
            </ul>
          </li>
        </ul>
      </li>
      <li> HR Department
        <ul>
          <li> HR Officer
            <ul>
              <li> HR Assistant 1 </li>
              <li> HR Assistant 2 </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
{% endhighlight %}

The above results in the following output:

<ul>
  <li> Managing Director
    <ul>
      <li> Sales Director </li>
      <li> IT Director
        <ul>
          <li> Technical Lead
            <ul>
              <li> Software Developer </li>
              <li> Support Technicial </li>
            </ul>
          </li>
        </ul>
      </li>
      <li> HR Department
        <ul>
          <li> HR Officer
            <ul>
              <li> HR Assistant 1 </li>
              <li> HR Assistant 2 </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

Creating this using HTML is pretty easy. When it doesn't become easy is when we need to render this information dynamically.

Let's say we have the structure available to us as a JavaScript array. In order to create the HTML representation of this structure, we're going to need to do some recursion since we may not necessarily be aware of how deep the structure will go.

Using React, we can split this app into components that will allow us to recur easily.

**Our Array Sample:**
{% highlight javascript %}
var people = [{
  id: 1,
  name: "Managing Director",
  people: [
    {
      id: 2,
      name: "Sales Director"      
    }, {
      id: 3,
      name: "IT Director",
      people: [
        {
          id: 4,
          name: "Technical Lead",
          people: [
            {
              id: 5,
              name: "Software Developer"
            },
            {
              id: 6,
              name: "Support Technician"
            }
          ]
        }        
      ]
    }, {
      id: 7,
      name: "HR Department",
      people: [
        {
          id: 8,
          name: "HR Officer",
          people: [{
            id: 9,
            name: "HR Assistant 1"
          }, {
            id: 10,
            name: "HR Assistant 2"
          }]
        }
      ]
    }
  ]
}];
{%endhighlight %}

**Note that each item in the array has it's own unique ID key. React requires a unique key for each element when there are multiple elements so it knows which element to reference when state updates or changes are made.**

We can start by creating our main container component ```Organisation``` that will hold our list.

This component uses ES5's ``` map() ``` function to loop through our ``` people ``` array and output a new ``` <Node />``` component for each item in the array.

For each ```<Node />``` component (represented as a new list in our outputted HTML), we pass the current person and it's children as props.

{% highlight javascript %}
class Organisation extends React.Component {  
  render() {
    // loop through the persons array and create a new component for each, passing the current person (id and name) and it's children (person.people) as props

    let nodes = people.map(function(person) {                   
      return (
        <Node node={person} children={person.people} />
      );
    });       

    return (
      <div>
        <ul className="org">
         {nodes}
        </ul>        
      </div>
    );
  }
}
{% endhighlight %}

The ``` <Node />``` component is where we output each individual list item and where the recursion takes place.

First, we create a variable called ```childnodes``` which will hold details of any children that were passed. We can access the children using ```this.props.children```.

If there are no children, we don't need to recurse and can close off the list. If there are children, we need to create a new list inside the current list.

Instead of creating new output for each new child, we can simply use recursion so the ```<Node />``` component can call itself for as long as it needs to, until an element in the array does not have children.

{% highlight javascript %}
class Node extends React.Component {

  render() {      

    let childnodes = null;

    // the Node component calls itself if there are children
    if(this.props.children) {      
      childnodes = this.props.children.map(function(childnode) {
       return (
         <Node node={childnode} children={childnode.people} />
       );
     });
    }

    // return our list element
    // display children if there are any
    return (
      <li key={this.props.node.id}>      
        <span>{this.props.node.name}</span>        
        { childnodes ?
          <ul>{childnodes}</ul>
        : null }
      </li>
    );
  }
}
{% endhighlight %}

Using React makes this look nice and clean and since everything is a component, our app is managable.
