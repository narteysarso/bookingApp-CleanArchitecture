const { objectType } = require('nexus')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.isActive()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
    t.model.app()
    t.model.rooms()
    t.model.books()
    t.model.amenities()
  },
})

module.exports = {
  User,
}
