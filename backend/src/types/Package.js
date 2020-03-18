const { objectType } = require('nexus');

const Package = objectType({
    name: "Package",
    definition(t){
        t.model.id()
        t.model.name()
        t.model.description()
        t.model.imageUrl()
        t.model.price()
        t.model.author()
        t.model.app()
        t.model.books()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.deletedAt()
    }
})

module.exports = {
    Package
}