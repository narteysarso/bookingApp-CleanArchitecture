const createPackageEvent = function ({
    id,
    name,
    description,
    imageUrl,
    price,
    author,
    app,
    createdAt,
    hash,
    ...rest
}) {
    paload = Object.freeze({
        id,
        name,
        description,
        imageUrl,
        price,
        author,
        app,
        hash,
        createdAt,
        ...rest
    })
    return Object.freeze({
        type: "created package",
        paload,
    })
}