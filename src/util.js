const util = require('util')

/**
 * @see https://nodejs.org/api/util.html#util_util_inspect_object_options
 */
exports.log = any => {
  console.log(util.inspect(any, { depth: null }))
  return any
}

exports.extractIDs = array => array.map(element => element.id)
