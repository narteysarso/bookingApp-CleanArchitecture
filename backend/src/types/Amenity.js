const {objectType} = require('nexus');

const Amenity = objectType({
    name: "Amenity",
    definition(t){
        t.model.id()
        t.model.name()
        t.model.description()
        t.model.rooms()
        t.model.author()
        t.model.app()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.deletedAt()
    }
})

module.exports = {
    Amenity
}