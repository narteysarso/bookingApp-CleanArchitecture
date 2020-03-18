const fakeBook = require('../../../__test__/faker/Book');
const makeBook = require('./');


describe("Book", () => {
    it("Should have a valid id", () => {
        expect(() => makeBook(fakeBook({ id: null }))).toThrow("Book must have a valid Id");
    });

    it("Should have a client name", () => {
        expect(() => makeBook(fakeBook({ clientName: null }))).toThrow("Book must have a client name with at least three characters");
    });
    it("Should have a client email", () => {
        expect(() => makeBook(fakeBook({ clientEmail: null }))).toThrow("Book must have a valid client email");
    });
    it("Should have a client phone", () => {
        expect(() => makeBook(fakeBook({ clientPhone: null }))).toThrow("Book must have a valid client phone");
    });

    it("can be marked deleted", () => {
        const book = makeBook(fakeBook());
        expect(book.getDeletedAt()).not.toBeDefined();
        book.markDeleted();
        expect(book.getDeletedAt()).toBeDefined();
        expect(new Date(book.getDeletedAt()).toUTCString().substring(26)).toBe("GMT");
    });

    it('must have a source', () => {
        const noSource = fakeBook({ source: undefined })
        expect(() => makeBook(noSource)).toThrow('Book must have a source')
    })

    it('sanitizes its text', () => {
        const sane = makeBook({
            ...fakeBook({ description: '<p>This is fine</p>' })
        })
        const insane = makeBook({
            ...fakeBook({
                description: '<script>This is not so fine</script><p>but this is ok</p>'
            })
        })
        const totallyInsane = fakeBook({
            description: '<script>All your base are belong to us!</script>'
        })

        expect(sane.getDescription()).toBe('<p>This is fine</p>')
        expect(insane.getDescription()).toBe('<p>but this is ok</p>')
        expect(() => makeBook(totallyInsane)).toThrow(
            'Book contains no usable description'
        )
    });

    it('must have a source ip', () => {
        const noIp = fakeBook({ source: { ip: undefined } })
        expect(() => makeBook(noIp)).toThrow(
            'Source must contain an IP.'
        )
    })

    it('can have a source browser', () => {
        const withBrowser = fakeBook()
        expect(
            makeBook(withBrowser)
                .getSource()
                .getBrowser()
        ).toBe(withBrowser.source.browser)
    })

    it('can have a source referrer', () => {
        const withRef = fakeBook()
        expect(
            makeBook(withRef)
                .getSource()
                .getReferrer()
        ).toBe(withRef.source.referrer)
    })


})
