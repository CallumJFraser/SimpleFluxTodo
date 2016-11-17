Simple Flux Todo
===

I felt the TODO example on the flux website is unnessasarally overcomplicated for someone to run thorugh and understand.

This Todo application is my interpretation of a simple client side flux implementation based on the [FLUX structure and data flow](https://facebook.github.io/flux/docs/overview.html#structure-and-data-flow).

Any feedback or improvements please give me a yell.

Setup
====

run `npm i` in command line/terminal to install node dependencies.

If you don't have it installed you will also need to run `npm i -g webpack` to install webpack globally.

Run
====

run `npm run build` to build the src/index.jsx file into the needed dist/index.js file.

run `npm run build-listen` to start build listener.

run `npm run dev` to run the webpack package listener for local hosting.

You can run the last 2 commands in 2 seperate terminals to automatically update any changes.

Design Decisions
====

1. Why use Immediately-invoked function expressions (IIFE)?
    I wanted to keep all of the code in one file for simplicity, Doing so means there could be scope issues and this is the simplest way around that issue.