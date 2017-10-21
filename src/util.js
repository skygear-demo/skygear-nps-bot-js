const util = require('util')
const { VERIFICATION_TOKEN } = require('./config')

/**
 * @see https://nodejs.org/api/util.html#util_util_inspect_object_options
 */
exports.log = any => {
  console.log(util.inspect(any, { depth: null }))
  return any
}

exports.extractIDs = array => array.map(element => element.id)

/**
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 * mimic JSON.parse
 */
exports.Form = class {
  static parse (req) {
    return new Promise((resolve, reject) => {
      req.form((formError, fields) => {
        if (formError) {
          reject(formError)
        }
        resolve(fields)
      })
    })
  }
}

/**
 * @see https://api.slack.com/docs/token-types#verification
 */
exports.verify = token => token === VERIFICATION_TOKEN
