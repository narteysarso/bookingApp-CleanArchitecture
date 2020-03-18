const fakeApp = require('../../../__test__/faker/App');
const makeApp = require('./');


describe("App", ()=> {
    it("Should have a valid id", ()=>{
        expect(()=>makeApp(fakeApp({id: null}))).toThrow("App must have a valid Id");
    } );

    it("Should have a name", ()=>{
        expect(() => makeApp(fakeApp({ name: null }))).toThrow("App must have a name with at least three characters");
    });

    it("Should be active on creation", ()=>{
        const app = makeApp(fakeApp());
        
        expect(app.getActiveStatus()).toBe(true);
    })

    it("can generate a new token", ()=>{
        const token = "563kjy8903koi23oi5k6kjspqo09219";
        const app = makeApp(fakeApp({token}));
        expect(app.getToken()).toBe(token)
        app.getNewToken();
        expect(app.getToken()).not.toBe(token);
    });

    it("can be made inactive",()=>{
        const app = makeApp(fakeApp());
        expect(app.getActiveStatus()).toBe(true);
        app.markInActive();
        expect(app.getActiveStatus()).toBe(false);
    });

    it("can be made active",()=>{
        const app = makeApp(fakeApp({isActive: false}));
        expect(app.getActiveStatus()).toBe(false);
        app.markActive();
        expect(app.getActiveStatus()).toBe(true);
    });

    it("can be marked deleted", ()=>{
        const app = makeApp(fakeApp());
        expect(app.getDeletedAt()).not.toBeDefined();
        app.markDeleted();
        expect(app.getDeletedAt()).toBeDefined();
        expect(new Date(app.getDeletedAt()).toUTCString().substring(26)).toBe("GMT");
    });

    it('must have a source', () => {
        const noSource = fakeApp({ source: undefined })
        expect(() => makeApp(noSource)).toThrow('App must have a source')
    })

    it('sanitizes its text', () => {
        const sane = makeApp({
            ...fakeApp({ description: '<p>This is fine</p>' })
        })
        const insane = makeApp({
            ...fakeApp({
                description: '<script>This is not so fine</script><p>but this is ok</p>'
            })
        })
        const totallyInsane = fakeApp({
            description: '<script>All your base are belong to us!</script>'
        })

        expect(sane.getDescription()).toBe('<p>This is fine</p>')
        expect(insane.getDescription()).toBe('<p>but this is ok</p>')
        expect(() => makeApp(totallyInsane)).toThrow(
            'App contains no usable description'
        )
    });

    it('must have a source ip', () => {
        const noIp = fakeApp({ source: { ip: undefined } })
        expect(() => makeApp(noIp)).toThrow(
            'Source must contain an IP.'
        )
    })

    it('can have a source browser', () => {
        const withBrowser = fakeApp()
        expect(
            makeApp(withBrowser)
                .getSource()
                .getBrowser()
        ).toBe(withBrowser.source.browser)
    })

    it('can have a source referrer', () => {
        const withRef = fakeApp()
        expect(
            makeApp(withRef)
                .getSource()
                .getReferrer()
        ).toBe(withRef.source.referrer)
    })

    
})
