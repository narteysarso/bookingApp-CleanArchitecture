const bookFactory = function ({Id, makeSource, sanitize, validator}){
    return function makeBook({
        id = Id.makeId(),
        clientName,
        clientEmail,
        clientPhone,
        description,
        room,
        book_package,
        cost,
        arrivalTime,
        depatureTime,
        author,
        isApproved,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt,
        source
    }){
        if (!Id.isValidId(id))
            throw new Error('Book must have a valid Id');

        if (!clientEmail)
            throw new Error('Book must have a valid client email')

        if (!clientName || clientName.length < 3)
            throw new Error('Book must have a client name with at least three characters')

        if (!clientPhone)
            throw new Error('Book must have a valid client phone')

        if (!author || !Id.isValidId(author.id)) {
            throw new Error('Book must have a valid author')
        }
        if (!source) {
            throw new Error('Book must have a source')
        }

        let validSource = makeSource(source);
        let sanitizedText = sanitize(description);
        if (description && sanitizedText.length < 1) {
            throw new Error('Book contains no usable description')
        }

        return Object.freeze({
            getSource: () => validSource,
            getClientName: () => clientName,
            getClientPhone: () => clientPhone,
            getClientEmail: () => clientEmail,
            getDescription: () => sanitizedText,
            getRoom: () => room,
            getPackage: () => book_package,
            getAuthor: () => author,
            getCost: () => cost,
            getApproved: () => isApproved,
            getArrivalTime: () => arrivalTime,
            getDepatureTime: () => depatureTime,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            markDeleted: () => {
                deletedAt = Date.now()
            }
        })
    }
}

module.exports = bookFactory