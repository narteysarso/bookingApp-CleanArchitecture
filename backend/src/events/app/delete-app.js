const deleteAppEvent = function ({
    id,
    name,
    token,
    createdAt,
    updatedAt,
    deletedAt,
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
        deletedAt,
        ...rest
    })
    return Object.freeze({
        type: "deleted app",
        paload,
    })
}