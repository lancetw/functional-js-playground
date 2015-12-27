export const inspect = (x) => (typeof x === 'function') ? inspectFn(x) : inspectArgs(x)

export const inspectFn = (f) => (f.name) ? f.name : f.toString()

export const inspectArgs = (args) => {
  return args.reduce(function(acc, x){
    return acc += inspect(x);
  }, '(') + ')'
}

// import { curry } from 'ramda'
export const curry = (fx) => {
  const arity = fx.length

  return function f1 () {
    const args = Array.prototype.slice.call(arguments, 0)
    if (args.length >= arity) {
      return fx.apply(null, args)
    }
    else {
      const f2 = function f2 () {
        const args2 = Array.prototype.slice.call(arguments, 0)
        return f1.apply(null, args.concat(args2));
      }
      f2.toString = () => inspectFn(fx) + inspectArgs(args)
      return f2
    }
  }
}

export const compose = () => {
  let args = arguments
  const fns = toArray(args)
  const arglen = fns.length

  return () => {
    for(let i = arglen; --i >= 0;) {
      const fn = fns[i]
      const now_args = fn.length ? Array.prototype.slice.call(args, 0, fn.length) : args
      const next_args = Array.prototype.slice.call(args, (fn.length || 1)) //not right with *args
      next_args.unshift(fn.apply(this, now_args))
      args = next_args
    }
    return args[0]
  }
}

export const add = curry((x, y) => x + y)

export const match = curry((what, x) => x.match(what))

export const replace = curry((what, replacement, x) => x.replace(what, replacement))

export const filter = curry((f, xs) => xs.filter(f))

export const map = curry((f, xs) => xs.map(f))

export const reduce = curry((f, a, xs) => xs.reduce(f, a))

export const split = curry((what, x) => x.split(what))

export const join = curry((what, x) => x.join(what))

export const toUpperCase = (x) => x.toUpperCase()

export const toLowerCase = (x) => x.toLowerCase()
