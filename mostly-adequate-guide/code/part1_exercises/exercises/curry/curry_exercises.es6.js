import {
  split,
  map,
  filter,
  match,
  reduce,
  curry
} from '../../support.es6'

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function

const words = split(' ')

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

const sentences = map(words)

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

const filterQs = filter(match(/q/i))

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

// LEAVE BE:
const _keepHighest = (x,y) => x >= y ? x : y

// REFACTOR THIS ONE:

const max = reduce(_keepHighest, 0)

// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
const slice = curry((head, last, xs) => xs.slice(head, last))

// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. Make it curried
const take = slice(0)

export {
  words,
  sentences,
  filterQs,
  max,
  slice,
  take
}
