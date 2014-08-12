var expect = require('chai').expect,
    ValidationError = require('../lib/ValidationError');



describe('ValidationError', function() {

    var validationError;

    beforeEach(function() {
        validationError = new ValidationError();
    });

    it('should be initialisable', function() {
        expect(validationError).to.be.instanceOf(ValidationError);
    });

    it('should be an error', function() {
        expect(validationError).to.be.instanceOf(Error);
    });

});