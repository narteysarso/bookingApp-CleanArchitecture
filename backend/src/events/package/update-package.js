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
        ...rest
    })
    return Object.freeze({
        type: "updated package",
        paload,
    })
}