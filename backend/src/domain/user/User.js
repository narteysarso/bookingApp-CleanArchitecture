function userFactory({Id, makeSource, makeHash, validator}){
    return function makeUser({
        id = Id.makeId(),
        name,
        email,
        passwordHash,
        isActive = true,
        source,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    } = {}) {
        

        if (!Id.isValidId(id))
            throw new Error('User must have a valid Id');

        if (!name || name.length < 3)
            throw new Error('User must have a name with at least three characters')

        if(!email || !validator.isValidEmail(email)){
            throw new Error('User must have a valid email') 
        }

        if (!source) {
            throw new Error('User must have a source')
        }

        let validSource = makeSource(source);
        return Object.freeze({
            getSource: () => validSource,
            getName: () => name,
            getEmail: () => email,
            getActiveStatus: () => isActive,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getPassword: () => passwordHash,
            markDeleted: () => {
                deletedAt = Date.now()
            },
            markActive: () => {
                isActive = true
            },
            markInActive: () => {
                isActive = false
            }
        });
    }
}

module.exports = userFactory