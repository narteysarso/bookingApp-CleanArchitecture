const { Id, makeHash, sanitize, makeSource, validator } = require('../../utils');
const roomFactory = require('./Room');

const makeRoom = roomFactory({Id, sanitize,makeSource, makeHash, validator});

module.exports = makeRoom;