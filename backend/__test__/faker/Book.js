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



const fakeBook = function (overrides) {
    const book = {
        id: Id.makeId(),
        clientName: faker.name.findName(),
        clientPhone: "0572575555",
        clientEmail: faker.internet.email(),
        description: faker.lorem.paragraphs(3),
        cost: faker.random.number(),
        isApproved: false,
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

    book.hash = makeHash(book.name + book.description + book.isActive + book.token);

    return {
        ...book,
        ...overrides
    };
}

module.exports = fakeBook