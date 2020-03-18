const fakeAmenity = require('../../../__test__/faker/Amenity');
const makeAmenity = require('./');

describe("Amenity", () => {
    it("Should have a valid id", () => {
        expect(() => makeAmenity(fakeAmenity({ id: null }))).toThrow("Amenity must have a valid Id");
    });

    it("Should have a name", () => {
        expect(() => makeAmenity(fakeAmenity({ name: null }))).toThrow("Amenity must have a name with at least three characters");
    });

    it("Should be active on creation", () => {
        const amenity = makeAmenity(fakeAmenity());

        expect(amenity.getActiveStatus()).toBe(true);
    })

    it("can be made inactive", () => {
        const amenity = makeAmenity(fakeAmenity());
        expect(amenity.getActiveStatus()).toBe(true);
        amenity.markInActive();
        expect(amenity.getActiveStatus()).toBe(false);
    });

    it("can be made active", () => {
        const amenity = makeAmenity(fakeAmenity({ isActive: false }));
        expect(amenity.getActiveStatus()).toBe(false);
        amenity.markActive();
        expect(amenity.getActiveStatus()).toBe(true);
    });

    it("can be marked deleted", () => {
        const amenity = makeAmenity(fakeAmenity());
        expect(amenity.getDeletedAt()).not.toBeDefined();
        amenity.markDeleted();
        expect(amenity.getDeletedAt()).toBeDefined();
        expect(new Date(amenity.getDeletedAt()).toUTCString().substring(26)).toBe("GMT");
    });

    it('must have a source', () => {
        const noSource = fakeAmenity({ source: undefined })
        expect(() => makeAmenity(noSource)).toThrow('Amenity must have a source')
    })

    it('sanitizes its text', () => {
        const sane = makeAmenity({
            ...fakeAmenity({ description: '<p>This is fine</p>' })
        })
        const insane = makeAmenity({
            ...fakeAmenity({
                description: '<script>This is not so fine</script><p>but this is ok</p>'
            })
        })
        const totallyInsane = fakeAmenity({
            description: '<script>All your base are belong to us!</script>'
        })

        expect(sane.getDescription()).toBe('<p>This is fine</p>')
        expect(insane.getDescription()).toBe('<p>but this is ok</p>')
        expect(() => makeAmenity(totallyInsane)).toThrow(
            'Amenity contains no usable description'
        )
    });

    it('must have a source ip', () => {
        const noIp = fakeAmenity({ source: { ip: undefined } })
        expect(() => makeAmenity(noIp)).toThrow(
            'Source must contain an IP.'
        )
    })

    it('can have a source browser', () => {
        const withBrowser = fakeAmenity()
        expect(
            makeAmenity(withBrowser)
                .getSource()
                .getBrowser()
        ).toBe(withBrowser.source.browser)
    })

    it('can have a source referrer', () => {
        const withRef = fakeAmenity()
        expect(
            makeAmenity(withRef)
                .getSource()
                .getReferrer()
        ).toBe(withRef.source.referrer)
    })


})
