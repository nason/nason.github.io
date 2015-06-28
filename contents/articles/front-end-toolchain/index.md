---
title: 'Front-End Tooling'
author: Michael Nason
date: 2015-05-02
template: article.hbs
categories: Code
comments: true
---

One of my guilty pleasures is setting up toolchains and development environments for front-end applications.

I'm going to summarize my thoughts on the subject here.

<span class="more" />

I typically use Node for this sort of tooling. It's nice to use the same language as the app. There are plenty of other options out there, too.

As far as actually running these tasks, I like to use `npm-scripts` as much as possible, and `gulp` for more complex areas.

### Linting + Style Checking
> JavaScript is full of foot-guns. Don't ignore the linter.

A proper linter helps you detect common mistakes, avoid poorly understood language features, and generally write more maintainable code.

I recently switched to `ESLint` for it's awesome ES6 & JSX support.

> A project should look like it was written by one person

I find following a style guide makes a codebase easier to reason about. I use `jscs` for style checking.

Even if you don't agree with a project's style, maintaining *consistency* and *readability* helps others' ability to jump in any time and be productive.

Style guides and linters compliment each other to help avoid both common and subtle pitfalls.

My linter and style checker typically run on source file change, and there are also some really nice editor plugins you can use to get instant visual feedback on lint/style warnings.

### Documentation
> Always update docs when you update a module, and so on.

Everyone has their own opinion on how code should be documented. My preference is to write `jsdoc` style comments, but whats really important here is keeping docs up to date.

That means making documentation a priority. Always update docs when you update a module, and so on.

One team policy I experienced and really appreciated was: if you touch a module without any documentation, add at least a base level yourself. This was slightly painful but quickly led to much better and thorough documentation.

My projects tend to generate documentation when running a release task. I want to explore using something like `flow` annotations instead of just declaring types in doc comments.

### Dependency Management + Bundling
> *Anything* is better than dependency management via script tags.

There ecosystem for dependency management in JavaScript is insane. I enjoy `browserify` and `webpack` a whole lot, but seriously *anything* is better than dependency management via script tags.

A bundle step will use your tool of choice to bundle your application. It can also pipe your code through transforms (for JSX, CoffeeScript, minification, or anything else you can imagine).

My bundle step typically has two modes: prod and dev. This is toggled by a condition like:


````javascript
const isProd = (process.env.NODE_ENV === 'production');
````

In dev mode, we want the bundle task to output verbose, unoptimized code. We want a source map so we can easily debug. We want this to run quickly so it can be re-run on source changes right away.

In prod mode, we want optimized, minified output. We still want a source map, but it should be an external file (not inline). For a large codebase, its ok if a prod bundle task takes some time.

To avoid inconsistency, I like keeping as much of the actual bundle pipeline as possible the same for both build modes.

### Live Reload / Hot Module Replacement
> I want my browser to update with my changes as soon as possible.

Live reload is my favorite thing. When I make a change to a source file, I want my browser to update with that change as soon as possible.

There are many ways to do this. I like `browser-sync`, which does live reload and a whole lot more.

I recently built a React app using Webpack and `react-hot-loader`. Hot Module Replacement updates and re-executes just the code you changed *without refreshing the page*. It takes a bit of work to setup, but it is really refreshing (hehe) to work this way.

### Tests

A test harness is usually one of the first things I setup for a new project. I like `karma`, which you can use to run tests in just about any framework.

If possible, I like to have two modes for this task as well. The default is to run all the tests and quit. The other option is to run in TDD mode and re-run tests on changes.

You can also setup your test task to instrument your code for coverage and generate reports, or to hook into a CI system or cloud test runner.

### Assets

If you're using a CSS pre- or post-processor you'll need a task to output your final stylesheet(s).

Likewise, if you have any html or image assets, etc you'll need a task to optimize and copy those over to your output directory.

Or, you could use bundler transforms and require your assets in your JS. I haven't done that in a project yet, and am on the fence about the idea.

### Dist / Deployment

Running `npm run deploy` is always a thrill.

What "deploy" means is entirely specific to your project's context. After taking a quick mental inventory of deploy tasks I've worked on, these are the types of things I think they typically do:

* bump version number
* run production build tasks
* upload assets to s3
* copy files into other projects
* output manifests
* commit and push to deployment-specific branches

### Tinker carefully

The way I see it, tooling has a sizable impact on any projects success.

It can be fun and super rewarding to tinker with and improve. At the same time, it can get very complex and becomes easy to break in subtle ways.

I've found myself in this place too many times:
![](http://i.imgur.com/pXTKc2B.gif)

So, treat your tooling code like you would application code. Track it, check it into VCS, put it through code review etc, and you won't get burned. *This is mostly a note to myself ;)*

### The big picture

Effective tooling transports a complex JavaScript application from the wild west to modern times.

With one command, any of my teammates can start a local development server that responds to code changes, runs tests, checks for style and lint violations, and generates coverage and file size reports.

By setting a single environment variable, they can do the exact same thing with production-ready output.

And with one slightly different command they can deploy the application, using the same tools.

I could probably go on forever about this stuff, but I'm going to cut myself off here. Feel free to reach out if you have questions, and thanks for reading!


