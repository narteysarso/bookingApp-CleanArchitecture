const {Id, sanitize, makeSource, makeHash, validator} = require("../../utils")
const packageFactory = require("./Package")
const makePackage = packageFactory({Id, sanitize, makeSource, makeHash, validator})

module.exports = makePackage