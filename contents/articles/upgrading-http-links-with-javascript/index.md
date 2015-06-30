---
title: Upgrading http links
author: Michael Nason
date: 2015-06-28
template: article.hbs
categories: Code
comments: true

---

HTTPS is no newcomer and continues to be increasingly important. With the [Let's Encrypt](https://letsencrypt.org/) project, HTTPS should become ubiquitous (and that is awesome!).

I say should, because it's up to content producers and publishers to take the effort to set it up on their server, and then responsibly link to others.
<span class="more" />

Just as Let's Encrypt will automate the creation and configuration of SSL certificates on servers, I want to be able to run my content through some kind of tool and replace any http links with https equivalents when possible.

I'm going to approach this from the context of this static site, but my goal here is to solve this problem in a general way and potentially publish it openly. And I'm going to document my process as I go along.

### Research (Phase 0)

What are the specific problems I'm trying to address?

>Upgrading all http links to https when possible.

Are there any existing tools or samples of this being done?

>[httpsify](https://github.com/classdojo/httpsify.js) looks interesting. Its not actively maintained, but it might be a useful mechanism for detecting https support.

>I don't see any prior attempts at this from a few cursory searches on Google, GitHub, and NPM. I should look for other link-detection tools.

Is this technically possible? What are some use cases?

>I think its technically possible. My initial naive thought-implementation is to scan all source files, map a location of all http links, try connecting to each via https, and replacing those that succeed.

>Server-side: A CLI tool. A build task. Server middleware. Browserify or Babel transform. An external service?

>Client-side: An external service? Probably not gonna go there for now.

### Design (Phase 1)

OK, enough with the self-interview. Now for some design specs. As a first attempt I'm going to imagine building this as a CLI tool:

#### Configuration/Options

```
-i path     A path to include
-x path     A path to exclude
-t timeout  Timeout in ms for each attempt [default: 2000ms]
-r retries  Number of retries for each link [default: 2]

--dry-run   Scan and test links, but don't write to files
--silent    Silence output
--debug     Output debug info & activity
--verbose   Output an extended report
```

#### Usage

Scan all html files (recursively) in the src and contents folders, output an extended report, and don't proceed to write to files:

```
try-https -i ./src/**/*.html -i ./contents/**/*.html --verbose --dry-run
```

#### Output

- If the `--dry-run` flag is *not* passed, included files will have upgradeable http links replaced in source.
- If the `--silent` flag is passed, there will be no stdout activity.
- If the `--verbose` flag is passed, a report will be logged to stdout.
- If the `--debug` flag is passed, log activity.
- If neither verbose or silent, minimal summary and status output.

#### Testing

Before I came up with the idea to do this, I manually updated many links on my site. I'll create a test suite that compares the output of this tool to those files before and after my manual update.

### Implementation (Phase 2)

I'll start by making a new folder and running `npm init`. This will generate a `package.json` file for us:


```json
{
  "name": "try-https",
  "version": "0.0.1",
  "description": "Try to replace all http links with https equivalents",
  "main": "lib/index.js",
  "author": "Mike Nason",
  "license": "MIT"
}
```

This seems like it might be an appropriate job for a [Transform Stream](https://nodejs.org/api/stream.html#stream_class_stream_transform_1), so next I'll `touch sample.js` and get to experimenting.

Starting small with a Readable stream for one single file with a few links:

```javascript
var fs = require('fs')
var source = fs.createReadStream('./test/sample/article1.md');
```

And then creating a transform stream via `through2`, I was able to detect/output all links in one file and their line numbers:

```javascript
"use strict";

const testFile = './test/sample/article1.md'
const HTTP_LINK_DETECTOR = /(http:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi

const through2 = require('through2');
const fs = require('fs');
const source = fs.createReadStream(testFile);

const HTTPSLinkTransformer = through2.ctor(
  { objectMode : true },
  function (chunk, encoding, callback) {
    var data = chunk.toString();
    var lines = data.split('\n');

    // For each line emit a tuple of: array of matched links, and source line number
    lines.map(function (line, i) {
      this.push([line.match(HTTP_LINK_DETECTOR), i])
    }, this);

    callback();
  }
);

let parser = new HTTPSLinkTransformer();
let linesWithLinks = [];

console.log(`Scanning ${testFile} for links...`);

source
  .pipe(parser)
  .on('data', function (data) {
    if (data[0]) {
      linesWithLinks.push(data)
    };
  })
  .on('end', function () {
    var output = '';

    linesWithLinks.forEach(function (line) {
      output += `
      Line ${line[1]}:
      ${line[0].join(', ')}
      `;
    });

    console.log(output);
  });
```

Now, lets give the `httpsify` module a shot:

```javascript
function checkLinks(linesToCheck) {
  console.log('line#', 'upgrade?', 'output', 'input');
  linesToCheck.forEach(function (line) {
    let links = line.links;
    let lineNo = line.lineNo;

    if (!links) {
      return;
    }

    links.forEach(function (link) {
      let path = url.parse(link).path;
      httpsify(path, link, function(url) {
        console.log(lineNo, url!==link, url, link);
      });
    })
  })
}
```

If I call this function with `linesWithLinks` in the `end` phase, I get reasonable output back.

## *I stepped away from the computer for a few hours and enjoyed some time outside with the company of friends and family.*
<br />
I had thought about this sample some more, and began tweaking and refactoring it. `sample.js` now looks like this:

```javascript
"use strict";

const TEST_FILE = './test/sample/article1.md'
const HTTP_LINK_DETECTOR = /(http:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi

const httpsify = require("httpsify");
const through2 = require('through2');
const process = require('process');
const url = require('url');
const memoize = require('lodash.memoize');

/**
 * checkLines
 * @param  {String} link - the http:// link to check
 * @return {Promise} - will resolve to the upgraded
 *                             or original url
 */
function checkLink(link) {
  if (!link) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    var timeout = makeTimeout(link, resolve);
    let path = url.parse(link).path;

    httpsify(path, link, function (url) {
      clearTimeout(timeout);
      resolve(url);
    });
  });
}
// Memoize checkLink so it can better handle duplicates
// This can be further optimized
checkLink = memoize(checkLink);

function makeTimeout(value, cb) {
  return setTimeout(function () {
    console.warn('request timeout - resolving with original link', value);
    cb(value);
  }, 7 * 1000);
}

function handleError(e) {
  console.error('Something went wrong', e);
}


/**
 * HTTPLinkDetector
 * Scans text for http links
 * https://nodejs.org/api/stream.html#stream_class_stream_transform_1
 */
const HTTPLinkDetector = through2.ctor(
  { objectMode : true },
  function (chunk, encoding, callback) {
    let startTime = process.hrtime();
    let data = chunk.toString();

    let links = data.match(HTTP_LINK_DETECTOR);

    let diffTime = process.hrtime(startTime);
    console.log('link scan for %d seconds', diffTime[0] + diffTime[1] / 1e9);

    console.info('http links detected - ', links.join(', '))

    links.forEach(function(link) {
      this.push(link);
    }, this);

    callback();
  }
);

/**
 * HTTPSLinkUpgrader
 * Reads a stream of http links and attempts to upgrade them
 * https://nodejs.org/api/stream.html#stream_class_stream_transform_1
 */
const HTTPSLinkUpgrader = through2.ctor(
  { objectMode : true },
  function (link, encoding, callback) {
    let _this = this;
    let startTime = process.hrtime();

    checkLink(link)
      .then(function (url) {
        _this.push(url);
      })
      .then(function () {
        let diffTime = process.hrtime(startTime);
        console.log('request for %d seconds', diffTime[0] + diffTime[1] / 1e9);

        callback.call(_this, null);
      })
      .catch(handleError);
  }
);

// Sample- Go!
(function () {
  const fs = require('fs');
  const source = fs.createReadStream(TEST_FILE);

  let startTime = process.hrtime();
  console.log(`Scanning ${TEST_FILE} for links...`);

  let scanner = new HTTPLinkDetector();
  let upgrader = new HTTPSLinkUpgrader();

  source
    .pipe(scanner)
    .pipe(upgrader)
    .on('data', function (data) {
      console.log('decided - ', data);
    })
    .on('end', function () {
      let diffTime = process.hrtime(startTime);
      console.log('processing completed in %d seconds', diffTime[0] + diffTime[1] / 1e9);

      process.exit();
    });
})()
```

and has output like:

```
~/C/try-https ❯❯❯ node sample.js
Scanning ./test/sample/article1.md for links...
link scan for 0.000082373 seconds
http links detected -  http://getbootstrap.com/getting-started/, http://www.visualstager.com/example/path, http://github.com/nason/bridgely, http://raw.github.com/nason/bridgely/master/screenshots/welcome.png, http://raw.github.com/nason/bridgely/master/screenshots/send_question.png, http://raw.github.com/nason/bridgely/master/screenshots/company_settings.png, http://github.com/nason.bridgely-api, http://github.com/nason/bridgely-api, http://github.com/nason/bridgely, http://github.com/nason/bridgely, http://nason.us/
request timeout - resolving with original link http://getbootstrap.com/getting-started/
decided -  http://getbootstrap.com/getting-started/
request for 7.002329387 seconds
decided -  http://www.visualstager.com/example/path
request for 0.334218294 seconds
decided -  https://github.com/nason/bridgely
request for 0.487163736 seconds
decided -  https://raw.github.com/nason/bridgely/master/screenshots/welcome.png
request for 0.661931585 seconds
decided -  https://raw.github.com/nason/bridgely/master/screenshots/send_question.png
request for 0.600791524 seconds
decided -  https://raw.github.com/nason/bridgely/master/screenshots/company_settings.png
request for 0.924468652 seconds
decided -  http://github.com/nason.bridgely-api
request for 0.373575556 seconds
decided -  https://github.com/nason/bridgely-api
request for 0.422029023 seconds
decided -  https://github.com/nason/bridgely
request for 0.000146614 seconds
decided -  https://github.com/nason/bridgely
request for 0.000060894 seconds
decided -  https://nason.us/
request for 0.567092333 seconds
processing completed in 11.645916292 seconds
```

And we're off! This is a start.

It does not come remotely close to the stated design, but I have some more confidence in the idea now. I'm going to sleep on it and see how I feel tomorrow...
