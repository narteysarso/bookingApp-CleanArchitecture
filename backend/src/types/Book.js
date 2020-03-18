const {objectType} = require('nexus');

const Book = objectType({
    name: "Book",
    definition(t){
        t.model.id()
        t.model.clientName()
        t.model.clientEmail()
        t.model.clientPhone()
        t.model.description()
        t.model.room()
        t.model.package()
        t.model.cost()
        t.model.arrivalTime()
        t.model.depatureTime()
        t.model.author()
        t.model.app()
        t.model.isApproved()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.deletedAt()
    }  
})

module.exports ={
    Book
}