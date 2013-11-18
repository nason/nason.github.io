---
title: On Learning Ruby
author: msn
date: 2013-10-06
template: article.html
thumb: vs_surface_item_height_change.gif
categories: Code, Hack Reactor
comments: true
---


I recently built [Bridgely](https://github.com/nason/bridgely) during my 3 week client-project period at Hack Reactor. I had been working in JavaScript exclusively, and was under the impression that I would be able to build this project with a Node.js + Express backend, which I had become very familiar with. My client, however, wanted a Ruby on Rails app. I decided to take on the project and learn Rails… <span class="more"/>

I may go more in-depth into this later, but here are some high-level observations of Ruby vs JavaScript I decided to write up. First of all, Ruby syntax is shockingly simple and expressive. It reminds me very much of CoffeeScript, a language that is transpiled into JavaScript.

## Symbols, hashes Symbols are a unique data type in Ruby.

A symbol looks like `:symbol` and is more-or-less a variable that you can't assign value to directly. The most common usage of symbols are as keys in objects (or hashes, if you prefer):

``` ruby
hash = { type: 'symbol', example: true }
=> { :type => 'symbol', :example => true }
```

Accessing object properties is different from Javascript. In JS this dot notation would work:

``` ruby
hash.type => NoMethodError: undefined method name for {:type => 'symbol', :example => true}:Hash
```

But in Ruby you must use array notation:

``` ruby
hash[:type] => 'symbol'
```

One oddity I've noticed is that any string can be represented as a symbol so you can do things like:

``` ruby
a = "This is a string" a.to_sym => :"This is a string"
```

or:

``` ruby
b = "Bridgely" b.to_sym => :Bridgely
```

There's nothing in JavaScript that really compares to symbols. If you're learning Ruby you'll just need to experiment in the console to get comfortable with symbols.

## This === Self

This one's pretty self explanatory The _this_ keyword in JavaScript is the _self_ keyword in Ruby

## ||=, =>, and <=>

I kept seeing these operators in Ruby tutorials, and had no insight about their function.

### Conditional assignment

In JS I'll often setup a default value for a parameter by doing a conditional assignment like so:

``` javascript
str = str || 'bar'
```

In Ruby, this can be simplified to:

``` ruby
str ||= 'bar'
```

_Nice!_

### Combined comparison

This one is pretty nifty:

``` ruby
a <=> b
```

The 'spaceship' operator returns 0 if a and b are equal, 1 if a is greater than b, and -1 if b is greater than a.

### Hashrocket

``` ruby
=>
```

This operator is used to assign values to keys in Ruby objects. You can see examples of it on my example code in the symbols & hashes section above. Finally, Underscore.js methods like map, each, collect, and reduce are mostly native in Ruby (or at least, in Ruby on Rails).

I'll try to make a similar comparison between Rails and Express in the near future! Stay tuned...