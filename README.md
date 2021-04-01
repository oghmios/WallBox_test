# Register on Wallbox

Test to register on Wallbox, and some negative tests

## Installation

`npm i`

## Execution

Cypress with UI: `npm run cypress:open` & click on `register.js`

Cypress on CLI: `npm run cypress:run`

## 

## Improvements

In addition to using `commands.js` to have a correct cypress structure, a new file has been added to store all the required helper functions. In this case I have created one to help me to randomly fill the fields. Any other helper functions could be added here.

The `before` function is present on each test instead of in `support/index.js` as usual, in order to simplify the tests. I have set up the required hierarchy to modify this behaviour if more complex tests are needed.

