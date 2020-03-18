const deleteBookEvent = function ({
    id,
    clientName,
    clientEmail,
    clientPhone,
    room,
    package,
    cost,
    arrivalTime,
    depatureTime,
    description,
    isApproved,
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
        type: "deleted book",
        paload,
    })
}