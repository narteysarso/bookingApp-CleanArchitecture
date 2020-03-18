const faker = require('faker');
const crypto = require('crypto');
const cuid = require('cuid');
const bcrypt = require('bcryptjs');

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

async function makePasswordHash(password) {
    try {
        const hash = await bcrypt.hash(password, 8);
        return hash;
    } catch (error) {
        throw error
    }
}

const fakeUser = function (overrides) {
    const user = {
        id: Id.makeId(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        source: {
            ip: faker.internet.ip(),
            browser: faker.internet.userAgent(),
            referer: faker.internet.url()
        }
    }

    user.hash = makeHash(user.name + user.email + user.password + user.isActive);
    
    user.passwordHash = makePasswordHash(faker.internet.password());

    return {
        ...user,
        ...overrides
    };
}

module.exports = fakeUser