const createBookEvent = function ({
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
        type: "created book",
        paload,
    })
}