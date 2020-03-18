const fakePackage = require('../../../__test__/faker/Package');
const makePackage = require('./');


describe("Package", () => {
    it("Should have a valid id", () => {
        expect(() => makePackage(fakePackage({ id: null }))).toThrow("Package must have a valid Id");
    });

    it("Should have a name", () => {
        expect(() => makePackage(fakePackage({ name: null }))).toThrow("Package must have a name with at least three characters");
    });

    it("Should be active on creation", () => {
        const bookingPackage = makePackage(fakePackage());

        expect(bookingPackage.getActiveStatus()).toBe(true);
    })

    it("can be made inactive", () => {
        const bookingPackage = makePackage(fakePackage());
        expect(bookingPackage.getActiveStatus()).toBe(true);
        bookingPackage.markInActive();
        expect(bookingPackage.getActiveStatus()).toBe(false);
    });

    it("can be made active", () => {
        const bookingPackage = makePackage(fakePackage({ isActive: false }));
        expect(bookingPackage.getActiveStatus()).toBe(false);
        bookingPackage.markActive();
        expect(bookingPackage.getActiveStatus()).toBe(true);
    });

    it("can be marked deleted", () => {
        const bookingPackage = makePackage(fakePackage());
        expect(bookingPackage.getDeletedAt()).not.toBeDefined();
        bookingPackage.markDeleted();
        expect(bookingPackage.getDeletedAt()).toBeDefined();
        expect(new Date(bookingPackage.getDeletedAt()).toUTCString().substring(26)).toBe("GMT");
    });

    it('must have a source', () => {
        const noSource = fakePackage({ source: undefined })
        expect(() => makePackage(noSource)).toThrow('Package must have a source')
    })

    it('sanitizes its text', () => {
        const sane = makePackage({
            ...fakePackage({ description: '<p>This is fine</p>' })
        })
        const insane = makePackage({
            ...fakePackage({
                description: '<script>This is not so fine</script><p>but this is ok</p>'
            })
        })
        const totallyInsane = fakePackage({
            description: '<script>All your base are belong to us!</script>'
        })

        expect(sane.getDescription()).toBe('<p>This is fine</p>')
        expect(insane.getDescription()).toBe('<p>but this is ok</p>')
        expect(() => makePackage(totallyInsane)).toThrow(
            'Package contains no usable description'
        )
    });

    it('must have a source ip', () => {
        const noIp = fakePackage({ source: { ip: undefined } })
        expect(() => makePackage(noIp)).toThrow(
            'Source must contain an IP.'
        )
    })

    it('can have a source browser', () => {
        const withBrowser = fakePackage()
        expect(
            makePackage(withBrowser)
                .getSource()
                .getBrowser()
        ).toBe(withBrowser.source.browser)
    })

    it('can have a source referrer', () => {
        const withRef = fakePackage()
        expect(
            makePackage(withRef)
                .getSource()
                .getReferrer()
        ).toBe(withRef.source.referrer)
    })


})
