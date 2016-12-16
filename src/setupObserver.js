module.exports = function (observer) {
    var _callbacks = [];

    observer.subscribe = callback => {
        const callbackId = _callbacks.length;
        _callbacks.push(callback);
        return callbackId;
    };

    observer.unsubscribe = callbackId => {
        _callbacks.splice(callbackId, 1);
    };

    return function publish (payload) {
        _callbacks.forEach(function (callback) {
            if (typeof callback === 'function') {
                callback(payload);
            }
        });
    };
};
