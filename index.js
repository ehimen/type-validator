var Validator = require('./lib/Validator');

var singleValidator;

module.exports = {
    get: function(config) {
        if (!singleValidator) {
            singleValidator = this.create(config);
        }
        return singleValidator;
    },
    create: function(config) {
        return new Validator(config);
    }
};