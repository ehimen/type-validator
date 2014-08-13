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

    it('should have an error message', function() {
        var validationError;
        validationError = new ValidationError('Assertion failure');
        expect(validationError.message).to.contain('Assertion failure');
    });

    it('should have a custom error message', function() {
        var validationError;
        validationError = new ValidationError('Assertion failure', 'Contextual message');
        expect(validationError.message).to.contain('Contextual message');
    });

    it('should be an error', function() {
        expect(validationError).to.be.instanceOf(Error);
    });

    it('should be a type error', function() {
        expect(validationError).to.be.instanceOf(TypeError);
    });

});