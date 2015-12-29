import {
} from '../part1_exercises/support.es6'
import {
  curry,
  identity,
  compose
} from 'ramda'
import Task from 'data.task'

export const inspect = (x) => (x && x.inspect) ? x.inspect() : x

export const toUpperCase = (x) => x.toUpperCase()

// Identity
export const Identity = function (x) { this.__value = x }
Identity.of = (x) => new Identity(x)
Identity.prototype.map = function (f) { return Identity.of(f(this.__value)) }
Identity.prototype.inspect = function () { return 'Identity('+inspect(this.__value)+')' }

// Maybe
export const Maybe = function (x) { this.__value = x }
Maybe.of = (x) => new Maybe(x)
Maybe.prototype.isNothing = function (f) { return this.__value === null || this.__value === undefined }
Maybe.prototype.map = function (f) { return this.isNothing() ? this : Maybe.of(f(this.__value)) }
Maybe.prototype.join = function () { return this.__value }
Maybe.prototype.inspect = function () { return 'Maybe('+inspect(this.__value)+')' }

// Either
export const Either = function () {}
Either.of = (x) => new Right(x)

export const Left = function (x) { this.__value = x }

Left.of = (x) => new Left(x)
Left.prototype.map = function (f) { return this }
Left.prototype.join = function () { return this }
Left.prototype.chain = function () { return this }
Left.prototype.inspect = function () { return 'Left('+inspect(this.__value)+')' }

export const Right = function (x) { this.__value = x }
Right.of = (x) => new Right(x)
Right.prototype.map = function (f) { return Right.of(f(this.__value)) }
Right.prototype.join = function () { return this.__value }
Right.prototype.chain = function (f) { return f(this.__value) }
Right.prototype.inspect = function () { return 'Right('+inspect(this.__value)+')' }

// IO
export const IO = function (f) { this.unsafePerformIO = f }
IO.of = (x) => new IO(() => x)
IO.prototype.map = function (f) { return new IO(compose(f, this.unsafePerformIO)) }
IO.prototype.join = function () { return this.unsafePerformIO() }
IO.prototype.inspect = function () { return 'IO('+inspect(this.__value)+')' }

export const unsafePerformIO = function (x) { return x.unsafePerformIO() }

export const either = curry((f, g, e) => {
  switch(e.constructor) {
    case Left: return f(e.__value)
    case Right: return g(e.__value)
  }
})

// overwriting join from pt 1
export const join = (m) =>  m.join()

export const chain = curry((f, m) => {
  return m.map(f).join() // or compose(join, map(f))(m)
})

Task.prototype.join = function () { return this.chain(identity) }
