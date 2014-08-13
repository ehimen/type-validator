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
 * Proxy for assertInstanceOf on an object's property.
 *
 * @param obj
 * @param {string} property       The name of the property to inspect.
 * @param {string} type           The constructor function the property should be an instance of.
 * @param {string} typeName       The name of the type for error reporting.
 * @param {string} failureMessage The message to display if validation fails.
 */
Validator.prototype.assertPropertyInstanceOf = function(obj, property, type, typeName, failureMessage)
{
    this.assertHasProperty(obj, property, failureMessage);
    this.assertInstanceOf(obj[property], type, typeName, failureMessage);
};

/**
 * Proxy for assertTypeOf on an object's property.
 *
 * @param obj                     The value to assert.
 * @param {string} property       The name of the property to inspect.
 * @param {string} type           The type expected.
 * @param {string} failureMessage The message to display if validation fails.
 */
Validator.prototype.assertPropertyTypeOf = function(obj, property, type, failureMessage)
{
    this.assertHasProperty(obj, property, failureMessage);
    this.assertTypeOf(obj[property], type, failureMessage);
};


/**
 * Asserts that object has the provided property.
 *
 * @param obj                     The object to check.
 * @param {string} property       The name of property to check on the object.
 * @param {string} failureMessage The message to display if validation fails.
 */
Validator.prototype.assertHasProperty = function(obj, property, failureMessage)
{
    this._doIfEnabled(function() {
        if (null === obj || undefined === obj) {
            throw new ValidationError('Expected object to have ' + property + ', but object was null/undefined', failureMessage);
        }
        if (typeof obj[property] === 'undefined') {
            throw new ValidationError('Expected object to have ' + property + ', but got undefined', failureMessage);
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
