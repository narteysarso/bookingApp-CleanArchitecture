const appFactory = require('./App');
const {Id, makeHash, sanitize, makeSource} = require('../../utils');

const makeApp = appFactory({Id, makeHash, sanitize, makeSource});

module.exports = makeApp