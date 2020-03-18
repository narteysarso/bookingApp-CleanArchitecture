const createAmenityEvent = function ({
    id,
    name,
    description,
    isActive,
    createdAt,
    updatedAt,
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
        author,
        app,
        ...rest
    })
    return Object.freeze({
        type: "created amenity",
        paload,
    })
}