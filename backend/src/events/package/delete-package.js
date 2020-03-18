const createPackageEvent = function ({
    id,
    name,
    description,
    imageUrl,
    price,
    author,
    app,
    createdAt,
    updatedAt,
    deletedAt,
    hash,
    ...rest
}) {
    paload = Object.freeze({
        id,
        name,
        hash,
        description,
        imageUrl,
        price,
        author,
        app,
        createdAt,
        updatedAt,
        deletedAt,
        ...rest
    })
    return Object.freeze({
        type: "deleted package",
        paload,
    })
}