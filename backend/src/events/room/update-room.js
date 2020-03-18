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
        type: "updated room",
        paload,
    })
}