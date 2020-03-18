const appFactory = function({Id, sanitize, makeHash, makeSource}){
    return function makeApp({
        id = Id.makeId(),
        name,
        description,
        token,
        source,
        isActive = true,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    } = {}){
        if(!Id.isValidId(id))
            throw new Error('App must have a valid Id');

        if(!name || name.length < 3)
            throw new Error('App must have a name with at least three characters')
        
        if (!source) {
            throw new Error('App must have a source')
        }

        let sanitizedText = sanitize(description);
        if (description && sanitizedText.length < 1) {
            throw new Error('App contains no usable description')
        }
        let hash;
        let validSource = makeSource(source);

        return Object.freeze({
            getId: () => id,
            getBooks: () => books,
            getName: () => name,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getDeletedAt: () => deletedAt,
            getActiveStatus: () => isActive,
            getDescription: () => sanitizedText,
            markDeleted: () => {
                deletedAt = Date.now();
            },
            markInActive: () => {
                isActive = false
            },
            markActive: () => {
                isActive = true
            },
            getToken: () => token || (token = Id.makeId()),
            getNewToken: () => {
                token = Id.makeId()
            },
            getSource: () => validSource,
            getHash: () => hash || (hash = makeHash(name+description+token+isActive))

        });
    }
}

module.exports = appFactory;

module.exports = appFactory