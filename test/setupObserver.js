require('chai').should();
const setupObserver = require('../src/setupObserver');

describe('setupObserver', function () {
    it('should add subscribe and unsubscribe function to passed object', function () {
        const fakeObject = {
            test: true
        };

        setupObserver(fakeObject)
        fakeObject.test.should.equal(true);
        fakeObject.subscribe.should.be.a('function');
        fakeObject.unsubscribe.should.be.a('function');
    });

    it('should return publish function', function () {
        const fakeObject = {
            test: true
        };

        const returnValue = setupObserver(fakeObject)
        returnValue.should.be.a('function');
    });

    it('should send published payload to subscribed functions', function (done) {
        const fakeObject = {};
        const fakePayload = {
            data: true
        };

        const returnValue = setupObserver(fakeObject)
        fakeObject.subscribe(function (payload) {
            payload.should.equal(fakePayload);
            done()
        });

        returnValue(fakePayload);
    });

    it('should not send published payload to unsubscribed functions', function (done) {
        const fakeObject = {};
        const fakePayload = {
            data: true
        };

        const returnValue = setupObserver(fakeObject)
        const idToDelete = fakeObject.subscribe(function (payload) {
            done('should not be called');
        });
        fakeObject.subscribe(function (payload) {
            payload.should.equal(fakePayload);
            done();
        });

        fakeObject.unsubscribe(idToDelete);

        returnValue(fakePayload);
    });
});