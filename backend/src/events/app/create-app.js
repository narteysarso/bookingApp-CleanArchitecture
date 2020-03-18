const createAppEvent = function ({
    id,
    name,
    token,
    createdAt,
    hash,
    ...rest
}) {
    paload = Object.freeze({
        id,
        name,
        token,
        hash,
        createdAt,
        ...rest
    })
    return Object.freeze({
        type: "created app",
        paload,
    })
}