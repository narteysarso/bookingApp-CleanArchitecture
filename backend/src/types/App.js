const { objectType } = require('nexus')

const App = objectType({
    name: 'App',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.token()
        t.model.isActive()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.hash()
        t.model.deletedAt()
        t.model.users({pagination: true})
        t.model.rooms({pagination: true})
        t.model.books({pagination: true})
        t.model.packages({pagination: true})
        t.model.amenities({pagination: true})
    },
})

module.exports = {
    App,
}
