const faker = require('faker');
const crypto = require('crypto');
const cuid = require('cuid');


const Id = {
    makeId: cuid,
    isValidId: cuid.isCuid
}

function makeHash(text) {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}



const fakeRoom = function (overrides) {
    const room = {
        id: Id.makeId(),
        name: faker.random.word(),
        description: faker.lorem.paragraphs(3),
        location: faker.random.word(),
        isActive: true,
        isBooked: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        price: faker.random.number(),
        author: {
            id: Id.makeId(),
            name: faker.name.findName(),
            email: faker.internet.email()
        },
        amenities: [{
            id: Id.makeId(),
        }],
        books: [{
            id: Id.makeId()
        }],
        source: {
            ip: faker.internet.ip(),
            browser: faker.internet.userAgent(),
            referer: faker.internet.url()
        }
    }

    room.hash = makeHash(room.name + room.description + room.isActive + room.token);

    return {
        ...room,
        ...overrides
    };
}

module.exports = fakeRoom