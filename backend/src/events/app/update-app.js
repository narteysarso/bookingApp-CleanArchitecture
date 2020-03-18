const updateAppEvent = function ({
    id,
    name,
    token,
    createdAt,
    updatedAt,
    hash,
    ...rest
}) {
    paload = Object.freeze({
        id,
        name,
        token,
        hash,
        createdAt,
        updatedAt,
        ...rest
    })
    return Object.freeze({
        type: "updated app",
        paload,
    })
}