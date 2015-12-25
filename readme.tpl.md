# TypeScript Minified Book

An abridged book on TypeScript

# Book
See the [mdfiles](./mdfiles) folder to see each chapter and the [output](output) folder for the book in different formats.

@toc

# Building the book

## Requirement

Node > 0.12.9

Install `nvm` and use `nvm` to manage your node versions:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```

Then, `nvm install 0.12.9` and after it is installed, load `0.12.9` in your current shell:

    nvm use 0.12.9

## Get Started

- Install dependencies with `npm i`
- Install [pandoc](http://pandoc.org/installing.html)
- Install `phantomjs` for your platform

```
 Windows (MSVC 2013), 64-bit, for Windows Vista or later, bundles VC++ Runtime 2013
$ curl -L http://astefanutti.github.io/decktape/downloads/phantomjs-msvc2013-win64.exe -o bin\phantomjs.exe
# Mac OS X (Cocoa), 64-bit, for OS X 10.6 or later
$ curl -L http://astefanutti.github.io/decktape/downloads/phantomjs-osx-cocoa-x86-64 -o bin/phantomjs
# Linux (CentOS 6), 64-bit
$ curl -L http://astefanutti.github.io/decktape/downloads/phantomjs-linux-centos6-x86-64 -o bin/phantomjs
# Linux (CentOS 7), 64-bit
$ curl -L http://astefanutti.github.io/decktape/downloads/phantomjs-linux-centos7-x86-64 -o bin/phantomjs
# Linux (Debian 8), 64-bit
$ curl -L http://astefanutti.github.io/decktape/downloads/phantomjs-linux-debian8-x86-64 -o bin/phantomjs
```

- Install KindleGen from [Amazon](https://www.amazon.com/gp/feature.html?docId=1000765211) - **make sure to put the binary in your path.**
- Use the `books` command to compile all the book formats:

`npm run books`
