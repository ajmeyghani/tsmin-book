# TypeScript Minified Book

An abridged book on TypeScript

# Book

See the [chapters](./chapters) folder to see each chapter and the [output](output) folder for the book in different formats.

# Building the book

You can use [bookly](https://github.com/st32lth/bookly) to build the book:

    bookly build -a -p '*.md'
    bookly build -e
    bookly build -e && bookly build -r
    bookly build -f 'html, pdf' -p '*.md'

See [bookly](https://github.com/st32lth/bookly) for usage details.
