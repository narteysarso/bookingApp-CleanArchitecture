const amenityFactory = require('./Amenity')
const { Id, makeHash, sanitize, makeSource, validator } = require('../../utils');

const makeAmenity = amenityFactory({Id, makeHash,sanitize,makeSource, validator})

module.exports = makeAmenity