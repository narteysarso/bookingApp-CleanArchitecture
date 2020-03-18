const { Id, makeHash, sanitize, makeSource, validator } = require('../../utils');
const bookFactory = require('./Book');

const makeBook = bookFactory({ Id, sanitize, makeSource, makeHash, validator });

module.exports = makeBook;