const deleteUserEvent = function ({
    id,
    name,
    email,
    isActive,
    createdAt,
    updatedAt,
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
        type: "deleted user",
        paload,
    })
}