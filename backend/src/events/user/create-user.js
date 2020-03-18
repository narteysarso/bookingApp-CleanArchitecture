const createUserEvent = function ({
    id,
    name,
    email,
    isActive,
    createdAt,
    hash,
    ...rest
}) {
    paload = Object.freeze({
        id,
        name,
        email,
        hash,
        isActive,
        createdAt,
        updatedAt,
        ...rest
    })
    return Object.freeze({
        type: "created user",
        paload,
    })
}