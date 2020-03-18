const fakeUser = require('../../../__test__/faker/User');
const makeUser = require('./');


describe("User", () => {
    it("Should have a valid id", () => {
        expect(() => makeUser(fakeUser({ id: null }))).toThrow("User must have a valid Id");
    });

    it("Should have a name", () => {
        expect(() => makeUser(fakeUser({ name: null }))).toThrow("User must have a name with at least three characters");
    });
    
    it("Should have a email", () => {
        expect(() => makeUser(fakeUser({ email: null }))).toThrow("User must have a valid email");
    });

    it("Should be active on creation", () => {
        const user = makeUser(fakeUser());

        expect(user.getActiveStatus()).toBe(true);
    })

    it("can be made inactive", () => {
        const user = makeUser(fakeUser());
        expect(user.getActiveStatus()).toBe(true);
        user.markInActive();
        expect(user.getActiveStatus()).toBe(false);
    });

    it("can be made active", () => {
        const user = makeUser(fakeUser({ isActive: false }));
        expect(user.getActiveStatus()).toBe(false);
        user.markActive();
        expect(user.getActiveStatus()).toBe(true);
    });

    it("can be marked deleted", () => {
        const user = makeUser(fakeUser());
        expect(user.getDeletedAt()).not.toBeDefined();
        user.markDeleted();
        expect(user.getDeletedAt()).toBeDefined();
        expect(new Date(user.getDeletedAt()).toUTCString().substring(26)).toBe("GMT");
    });

    it('must have a source', () => {
        const noSource = fakeUser({ source: undefined })
        expect(() => makeUser(noSource)).toThrow('User must have a source')
    })

    it('must have a source ip', () => {
        const noIp = fakeUser({ source: { ip: undefined } })
        expect(() => makeUser(noIp)).toThrow(
            'Source must contain an IP.'
        )
    })

    it('can have a source browser', () => {
        const withBrowser = fakeUser()
        expect(
            makeUser(withBrowser)
                .getSource()
                .getBrowser()
        ).toBe(withBrowser.source.browser)
    })

    it('can have a source referrer', () => {
        const withRef = fakeUser()
        expect(
            makeUser(withRef)
                .getSource()
                .getReferrer()
        ).toBe(withRef.source.referrer)
    })


})
