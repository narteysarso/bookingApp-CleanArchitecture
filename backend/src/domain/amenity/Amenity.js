const amenityFactory= function({Id, makeHash, sanitize, makeSource}){
    return function makeAmenity({
        id = Id.makeId(),
        name,
        description,
        isActive = true,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt,
        author,
        source
    }){
        if (!Id.isValidId(id))
            throw new Error('Amenity must have a valid Id');

        if (!name || name.length < 3)
            throw new Error('Amenity must have a name with at least three characters')
        
        if(!author || !Id.isValidId(author.id)){
            throw new Error('Amenity must have a valid author')
        }
        if (!source) {
            throw new Error('Amenity must have a source')
        }

        let validSource = makeSource(source);
        let sanitizedText = sanitize(description);
        if (description && sanitizedText.length < 1) {
            throw new Error('Amenity contains no usable description')
        }
        return Object.freeze({
            getId: () => id,
            getSource: () => validSource,
            getName: () => name,
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

module.exports = amenityFactory