const fakeRoom = require('../../../__test__/faker/Room');
const makeRoom = require('./');


describe("Room", () => {
    it("Should have a valid id", () => {
        expect(() => makeRoom(fakeRoom({ id: null }))).toThrow("Room must have a valid Id");
    });

    it("Should have a name", () => {
        expect(() => makeRoom(fakeRoom({ name: null }))).toThrow("Room must have a name with at least three characters");
    });

    
    it("can be marked deleted", () => {
        const room = makeRoom(fakeRoom());
        expect(room.getDeletedAt()).not.toBeDefined();
        room.markDeleted();
        expect(room.getDeletedAt()).toBeDefined();
        expect(new Date(room.getDeletedAt()).toUTCString().substring(26)).toBe("GMT");
    });

    it('must have a source', () => {
        const noSource = fakeRoom({ source: undefined })
        expect(() => makeRoom(noSource)).toThrow('Room must have a source')
    })

    it('sanitizes its text', () => {
        const sane = makeRoom({
            ...fakeRoom({ description: '<p>This is fine</p>' })
        })
        const insane = makeRoom({
            ...fakeRoom({
                description: '<script>This is not so fine</script><p>but this is ok</p>'
            })
        })
        const totallyInsane = fakeRoom({
            description: '<script>All your base are belong to us!</script>'
        })

        expect(sane.getDescription()).toBe('<p>This is fine</p>')
        expect(insane.getDescription()).toBe('<p>but this is ok</p>')
        expect(() => makeRoom(totallyInsane)).toThrow(
            'Room contains no usable description'
        )
    });

    it('must have a source ip', () => {
        const noIp = fakeRoom({ source: { ip: undefined } })
        expect(() => makeRoom(noIp)).toThrow(
            'Source must contain an IP.'
        )
    })

    it('can have a source browser', () => {
        const withBrowser = fakeRoom()
        expect(
            makeRoom(withBrowser)
                .getSource()
                .getBrowser()
        ).toBe(withBrowser.source.browser)
    })

    it('can have a source referrer', () => {
        const withRef = fakeRoom()
        expect(
            makeRoom(withRef)
                .getSource()
                .getReferrer()
        ).toBe(withRef.source.referrer)
    })


})
