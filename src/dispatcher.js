var _callbacks = [];

module.exports = {
    register: callback => {
        _callbacks.push(callback);
    },
    dispatch: payload => {
        _callbacks.forEach(callback => {
            if (typeof callback === 'function') {
                callback(payload);
            }
        });
    }
};
