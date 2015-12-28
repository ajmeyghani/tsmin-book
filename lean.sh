#!/bin/bash
# build the book for leanpub and the folder structure
# that it expects.
rm -rf manuscript
bookly concat -c book.config.js
cp -r output/manuscript manuscript
cp book-lean.txt manuscript/book.txt
cp -r images manuscript/images
