const createRoomEvent = function ({
    id,
    name,
    price,
    location,
    isBooked,
    amenities,
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
        type: "deleted room",
        paload,
    })
}