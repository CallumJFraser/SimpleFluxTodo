Simple Flux Todo
===

I felt the TODO example on the flux website is unnessasarally overcomplicated for someone to run thorugh and understand.

This Todo application is my interpretation of a simple client side flux implementation based on the [FLUX structure and data flow](https://facebook.github.io/flux/docs/overview.html#structure-and-data-flow).

This application uses the following:

* Building
    * [Webpack](https://webpack.github.io/) - Combines the JS files in /src folder into one 'bundle' JS file.
    * [Babel](https://babeljs.io/) - Transpiles ES6 JS code into the more compatible ES5 standard.
* Client-side
    * [Bootstrap](https://getbootstrap.com/) - CSS grid and basic application styles


Any feedback or improvements please give me a yell.

Setup
====

run `npm i` in command line/terminal to install node dependencies.

If you don't have it installed you will also need to run `npm i -g webpack` to install webpack globally.

Run
====

run `npm run build` to build the src/index.js file into the needed build/index.bundle.js file.

run `npm run watcher` to run the webpack package listener for local hosting.

Design Decisions
====

1. Why use Immediately-invoked function expressions (IIFE)?
    I wanted to keep all of the code in one file for simplicity, Doing so means there could be scope issues and this is the simplest way around that issue.