var ValidationError = require('./ValidationError');

/**
 * Main validator class used to validate data and types.
 *
 * @param {Object} config
 *
 * @constructor
 */
var Validator = function(config)
{
    config = config || {};
    this.enabled = !!config.enabled || true;
};


/**
 * Asserts the the value provided has type type based on a simple typeof check.
 *
 * @param value                   The value to assert.
 * @param {string} type           The type expected.
 * @param {string} failureMessage The message to display if validation fails.
 */
Validator.prototype.assertTypeOf = function(value, type, failureMessage)
{
    this._doIfEnabled(function() {
        if (typeof value !== type) {
            throw new ValidationError('Expected type ' + type + ', but got ' + typeof value, failureMessage);
        }
    });
};

/**
 * Asserts that a value is in instance of something.
 *
 * @param value                     The value to assert instance of.
 * @param {Function} type           The constructor function the value should be an instance of.
 * @param {string}   typeName       The name of the type for error reporting.
 * @param {string}   failureMessage The message to display if validation fails.
 */
Validator.prototype.assertInstanceOf = function(value, type, typeName, failureMessage)
{
    this._doIfEnabled(function() {
        var expectedInstanceString;
        expectedInstanceString = typeName ? ' ' + typeName : '';
        if (!(value instanceof type)) {
            throw new ValidationError('Expected instance ' + expectedInstanceString, failureMessage);
        }
    });
};

/**
 * Only executes the provided fn if this validator is enabled.
 *
 * @param {Function} fn The function to run.
 *
 * @private
 */
Validator.prototype._doIfEnabled = function(fn)
{
    this.enabled && fn();
};

module.exports = Validator;
