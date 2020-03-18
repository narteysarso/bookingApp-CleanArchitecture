const {Id, makeHash, makePasswordHash, makeSource, validator} = require('../../utils');
const userFactory = require('./User');

const makeUser = userFactory({Id,makeSource,makeHash,makePasswordHash, validator});

module.exports = makeUser;