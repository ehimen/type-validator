/**
 * Indicates a validation error.
 *
 * @constructor
 */
var ValidationError = function(assertion, message)
{
    Error.call(this);
};

ValidationError.prototype = Object.create(Error.prototype);

module.exports = ValidationError;