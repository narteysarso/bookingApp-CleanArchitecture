const deleteAmenityEvent = function ({
    id,
    name,
    description,
    isActive,
    createdAt,
    updatedAt,
    deletedAt,
    hash,
    author,
    app,
    ...rest
}) {
    paload = Object.freeze({
        id,
        name,
        description,
        hash,
        isActive,
        createdAt,
        updatedAt,
        deletedAt,
        author,
        app,
        ...rest
    })
    return Object.freeze({
        type: "deleted amenity",
        paload,
    })
}