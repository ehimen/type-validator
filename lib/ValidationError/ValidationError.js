/**
 * Indicates a validation error.
 *
 * @constructor
 */
var ValidationError = function(assertion, message)
{
    TypeError.call(this);
    this.message = assertion;
    if (message) {
        this.message += "\n" + message;
    }
};

ValidationError.prototype = Object.create(TypeError.prototype);

module.exports = ValidationError;