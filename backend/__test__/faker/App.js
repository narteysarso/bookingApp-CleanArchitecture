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



const fakeApp = function(overrides){
    const app = {
        id: Id.makeId(),
        name: faker.random.word(),
        description: faker.lorem.paragraphs(3),
        isActive: true,
        token: faker.random.uuid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        source:{
            ip: faker.internet.ip(),
            browser: faker.internet.userAgent(),
            referer: faker.internet.url()
        }
    }

    app.hash = makeHash(app.name+app.description+app.isActive+app.token);

    return {
        ...app,
        ...overrides
    };
}

module.exports = fakeApp