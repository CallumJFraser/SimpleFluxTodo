require('chai').should();
const dispatcher = require('../src/dispatcher');

describe('dispatcher', function () {
    it('should export setupObserver interface', function () {
        dispatcher.subscribe.should.be.a('function');
        dispatcher.unsubscribe.should.be.a('function');
    });

    it('should expose publish function', function () {
        dispatcher.publish.should.be.a('function');
    });
});
