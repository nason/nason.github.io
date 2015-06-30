---
title: 'Ditching Wordpress'
author: Michael Nason
date: 2013-11-25
template: article.hbs
categories: Code, Personal
comments: true
---

Today I am launching the second version of my personal website. I've migrated from WordPress to a static site, and spent a lot of time thinking about experience and design.

In this post I'm going to write about static site generators, the tools I used for this site, my workflow, and open sourcing my website.<span class="more" />

### WordPress is versatile, but not for me
I have built quite a few websites on top of WordPress for friends, family, clients, and most recently, myself.

My WordPress setup was pretty nice. After a couple weeks, I realized that WordPress was probably not the right tool for my personal site. Here's why:

1. WordPress is a bit **overkill** for my purposes. I don't need users and authentication, or even a web-based administration interface.
2. My site should showcase my abilities as a software engineer. I specialize in JavaScript, not PHP, and I prefer clean, modern code over  **legacy implementations**.
3. **Hackers** love to target WordPress installs. The last thing I want to worry about is my personal site being attacked or defaced.
4. WordPress is **slow** and requires a full LAMP stack. I wanted a static site for its inherent speed benefits, simplicity and portability.

Finally, **I enjoy challenging myself** and decided it would be a worthwhile effort to create a personal site to be proud of.

### Keepin' It Simple
I love the idea of authoring content in a lightweight format (i.e., Markdown). In fact I was using a WordPress plugin so that I could do exactly that. Unfortunately, this led to many bugs and frustration with WordPress's admin tools.

When I started investigating WordPress alternatives I was floored by the sheer number of projects out there.

I nearly convinced myself to switch to [Ghost](https://www.ghost.org), but decided it was too immature and still too complex (but not before making a couple contributions to the project first)!

Don't get me wrong, Ghost is awesome, but I have no need to serve my site from a Node server or utilize Backbone even though I'm a big fan of both those tools.

### Static Site Generators
The concept of a static site generator started to become more and more appealing. These tools allow you to setup a workflow with your own templates, stylesheets, and content to generate static html pages.

Of the many generators I investigated, I settled on [Wintersmith](http://wintersmith.io) because it is a very lightweight Node module that allows for total flexibility.

This is different from Ghost because it is a Node module that you execute locally to generate static files that can then be served anywhere.

### Tools
With Wintersmith, I am able to generate static pages using my preferred tools:

* [Handlebars](http://handlebarsjs.com/) for HTML templating
* [Stylus](https://learnboost.github.io/stylus/) for CSS preprocessing
* [Bower](http://bower.io/) for front-end dependency management
* [Browserify](http://browserify.org/) to modularize front-end code
* [Grunt](http://gruntjs.com/) for workflow automation

I forked the design you see here from Overflow by [HTML5Up](http://html5up.net/). I abstracted, modularized and customized that design's code into the various Handlebars templates and Stylus styles that I use to generate this website.

The code is organized & tidy, which makes my site a pleasure to maintain.

### Workflow
My favorite part of this project is my new workflow based on Git and Grunt.

Wintersmith will happily create a local server environment, so authoring new content or updating the look and feel of the site is quick, manageable, and private.

I commit my changes to version control using Git. I can track my change history, make new branches to work on features independently, and not have to worry about losing code. If this were a group effort, it would be just as easy to collaborate with my team.

Grunt allows me to automatically optimize every aspect of my page. These tasks reduce the size and rendering time of my homepage by nearly 200% versus my preview environment without these optimizations.

Here's a quick overview of how I'm using Grunt to automate my workflow:

* JavaScript linting
* HTML, CSS, and JavaScript minification
* Image optimization
* Hash based resource caching
* Pushing content to GitHub pages

Most of these are best practices for web development, but I didn't want to manually perform these tasks every time I made changes. My workflow is as simple as:

1. `grunt preview` while making changes
2. `git add <filename>; git commit` once my change is done
3. `grunt deploy` to build, lint, minify, optimize, add hashes, and push to GitHub

It's really awesome! Unfortunately I didn't benchmark my old WordPress site, but I'd estimate this static site loads 5-10x faster.

### Open Sourcing my Website
I was a little nervous to publish my code for all to see, but decided to go for it. The source for this website is available here: [https://github.com/nason/nason.github.io/tree/source](https://github.com/nason/nason.github.io/tree/source).

*Note: the 'master' branch is the static content GitHub pages serves; the 'source' branch is my project's source code.*

Ultimately I hope this project will help others make the leap of migrating to static sites using the tools of their choice. 

If anything, I hope to elicit feedback from my peers in the open-source community and continue learning.


### Dependencies and Next Steps

I intend to remove both of this project's heavier dependencies in the near future and replace them with lightweight, custom modules:

* Overflow ships with a frontend library dependency, SkelJS, for targeted stylesheet delivery and some basic layout functionality.
* jQuery, which I used to implement some effects on the homepage.

I'll try to use GitHub issues from now on to keep track of bugs and my progress. Feel free to open issues to let me know of any problems you find...

Finally, I intend to continue writing about this project and other interesting technologies. Stay tuned! 

