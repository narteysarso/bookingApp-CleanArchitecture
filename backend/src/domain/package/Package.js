const packageFactory = function({Id, makeHash, sanitize,makeSource }){
    return function makePackage({
        id = Id.makeId(),
        name,
        description,
        price,
        author,
        isActive = true,
        createdAt,
        updatedAt,
        deletedAt,
        source
    }={}){
        if (!Id.isValidId(id))
            throw new Error('Package must have a valid Id');

        if (!name || name.length < 3)
            throw new Error('Package must have a name with at least three characters')

        if (!author || !Id.isValidId(author.id)) {
            throw new Error('Package must have a valid author')
        }
        if (!source) {
            throw new Error('Package must have a source')
        }

        let validSource = makeSource(source);
        let sanitizedText = sanitize(description);
        if (description && sanitizedText.length < 1) {
            throw new Error('Package contains no usable description')
        }
        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getAuthor: () => author,
            getPrice: () => price,
            getDescription: () => sanitizedText,
            getHash: () => hash || (hash = makeHash(name+price+isActive+description)),
            getActiveStatus: () => isActive,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getSource: () => validSource,
            markDeleted: () => {
                deletedAt = Date.now()
            },
            markActive: () => {
                isActive = true
            },
            markInActive: () => {
                isActive = false
            }
        })
    }
}

module.exports = packageFactory