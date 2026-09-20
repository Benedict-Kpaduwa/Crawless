const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

// contextBridge only supports passing plain data, arrays, and functions across
// an isolated-world boundary — it does not preserve custom prototypes, so a
// live dayjs() instance (a class with chained methods) can't cross as-is.
// Instead we wrap each instance in a plain object of bridged functions that
// close over the real instance on this (Node-enabled) side, and only ever
// return plain values or another wrapped object. Add more methods here as
// workflows need them — this is the extension point for Utils.dayjs.
function wrapDayjs(instance) {
  return {
    format: (fmt) => instance.format(fmt),
    toISOString: () => instance.toISOString(),
    valueOf: () => instance.valueOf(),
    isValid: () => instance.isValid(),
    utc: () => wrapDayjs(instance.utc()),
    add: (amount, unit) => wrapDayjs(instance.add(amount, unit)),
    subtract: (amount, unit) => wrapDayjs(instance.subtract(amount, unit)),
  }
}

function dayjsFacade(...args) {
  return wrapDayjs(dayjs(...args))
}
dayjsFacade.utc = (...args) => wrapDayjs(dayjs.utc(...args))

// lodash's export is a plain function with plain function properties attached
// (no custom class instances), which contextBridge can bridge directly.
function buildUtils() {
  return {
    lodash: require('lodash'),
    dayjs: dayjsFacade,
  }
}

module.exports = { buildUtils, wrapDayjs }
