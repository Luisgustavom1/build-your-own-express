var http = require('node:http')

module.exports = http.METHODS.map(function lowerCaseMethod (method) {
  return method.toLowerCase()
})