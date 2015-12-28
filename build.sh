#!/bin/bash
# build each chapter, convert each chapter to pdf
# build the book in all formats
rm -rf output
bookly build -e -c book.config.js
bookly build -r -c book.config.js
bookly build -a -c book.config.js
