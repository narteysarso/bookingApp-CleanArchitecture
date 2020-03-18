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



const fakePackage = function (overrides) {
    const bookingPackage = {
        id: Id.makeId(),
        name: faker.random.word(),
        description: faker.lorem.paragraphs(3),
        isActive: true,
        imageUrl: faker.internet.url(),
        price: faker.random.number(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        author: {
            id: Id.makeId(),
            name: faker.name.findName(),
            email: faker.internet.email()
        },
        source: {
            ip: faker.internet.ip(),
            browser: faker.internet.userAgent(),
            referer: faker.internet.url()
        }
    }

    bookingPackage.hash = makeHash(bookingPackage.name + bookingPackage.description + bookingPackage.isActive + bookingPackage.token);

    return {
        ...bookingPackage,
        ...overrides
    };
}

module.exports = fakePackage