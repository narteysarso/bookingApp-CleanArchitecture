const {objectType} = require('nexus');

const Room = objectType({
    name: "Room",
    definition(t){
        t.model.id()
        t.model.name()
        t.model.description()
        t.model.location()
        t.model.isBooked()
        t.model.price()
        t.model.author()
        t.model.amenities()
        t.model.books()
        t.model.app()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.deletedAt()
    }
})

module.exports = {
    Room
}