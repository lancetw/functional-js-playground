import {
  map,
  add,
  reduce,
  replace,
  toLowerCase,
  join
} from '../../support.es6'
import {
  last,
  prop,
  sortBy,
  filter,
  compose,
  head,
  curry,
  flip,
  concat
} from 'ramda'
import accounting from 'accounting'

// Example Data
const CARS = [
  {name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false}
]

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.
const isLastInStock = compose(prop('in_stock'), last)

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car
const nameOfFirstCar = compose(prop('name'), head)

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition
const _average = (xs) => reduce(add, 0, xs) / xs.length // <- leave be

const averageDollarValue = compose(_average, map(prop('dollar_value')))
// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that takes an array of cars and returns a list of lowercase and underscored names: e.g: sanitizeNames([{name: "Ferrari FF"}]) //=> ["ferrari_ff"].

const _underscore = replace(/\W+/g, '_') //<-- leave this alone and use to sanitize

const sanitizeNames = map(compose(_underscore, toLowerCase, prop('name')))

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const formatedPrice = compose(
                            accounting.formatMoney,
                            prop('dollar_value'))
const availablePrices = compose(
                                join(', '),
                                map(formatedPrice),
                                filter(prop('in_stock')))

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip()

const append = flip(concat)
const fastestCar = compose(append(' is the fastest'), prop('name'), last, sortBy(prop('horsepower')))

/*const fastestCar = function(cars) {
  var sorted = sortBy(function(car){ return car.horsepower }, cars)
  var fastest = last(sorted)
  return fastest.name + ' is the fastest'
}*/

export {
  CARS,
  isLastInStock,
  nameOfFirstCar,
  fastestCar,
  averageDollarValue,
  availablePrices,
  sanitizeNames
}
