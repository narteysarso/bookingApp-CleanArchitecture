const roomFactory = function({Id, sanitize, makeSource,}){
    return function makeRoom({
        id = Id.makeId(),
        name,
        description,
        location,
        isActive = true,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt,
        author,
        books,
        amenities,
        source
    }){
        if (!Id.isValidId(id))
            throw new Error('Room must have a valid Id');

        if (!name || name.length < 3)
            throw new Error('Room must have a name with at least three characters')

        if (!author || !Id.isValidId(author.id)) {
            throw new Error('Room must have a valid author')
        }
        if (!source) {
            throw new Error('Room must have a source')
        }

        let validSource = makeSource(source);
        let sanitizedText = sanitize(description);
        if (description && sanitizedText.length < 1) {
            throw new Error('Room contains no usable description')
        }

        return Object.freeze({
            getSource: () => validSource,
            getName: () => name,
            getLocation: () => location,
            getBooks: () => books,
            getAmenities: () => amenities,
            getAuthor: () => author,
            getDescription: () => sanitizedText,
            getActiveStatus: () => isActive,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
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

module.exports = roomFactory