var ValidationError = require('./../ValidationError/ValidationError');

/**
 * The base assertion type.
 *
 * An assertion is configured and then executed.
 *
 * @param {boolean} active Whether or not this assertion is active.
 * @param           target The target for the assertion.
 *
 * @constructor
 */
var Assertion = function(active, target)
{
    this._active = active === undefined ? true : !!active;
    this._target = target;
    this._type = null;
    this._typeName = '';
    this._propertyStack = [];
};

/**
 * Asserts the head of this assertion is a type of.
 *
 * @param {string} type             String representation of the type to check.
 * @param {string} [failureMessage] The contextual message to throw if assertion failed.
 */
Assertion.prototype.typeOf = function(type, failureMessage)
{
    this._type = type;
    this._execute(failureMessage);
};


/**
 * Asserts the head of this assertion is an instance of.
 *
 * @param          type             The constructor function to check.
 * @param {string} [typeName]       An optional type name to aid debugging.
 * @param {string} [failureMessage] The contextual message to throw if assertion failed.
 */
Assertion.prototype.instanceOf = function(type, typeName, failureMessage)
{
    this._type = type;
    this._typeName = typeName;
    this._execute(failureMessage);
};

/**
 * Amends this assertion to check the existence of a property.
 *
 * @param {string} property The name of the property.
 *
 * @returns {Assertion}
 */
Assertion.prototype.hasProperty = function(property)
{
    this._propertyStack.push(property);
    return this;
};

/**
 *
 * @param {string} [failureMessage] The contextual message to throw if assertion failed.
 */
Assertion.prototype.elseThrow = function(failureMessage)
{
    this._execute(failureMessage);
};


/**
 * Executes the assertion.
 *
 * @param {string} [failureMessage] The contextual message to throw if assertion failed.
 *
 * @private
 */
Assertion.prototype._execute = function(failureMessage)
{

    if (!this._active) {
        return;
    }

    var i, currentTarget;

    if (this._propertyStack.length === 0) {
        this._assertType(this._target, this._type, null, failureMessage);
    } else {
        currentTarget = this._target;
        for (i = 0; i < this._propertyStack.length; i++) {
            if (undefined === currentTarget || null === currentTarget || !currentTarget.hasOwnProperty(this._propertyStack[i])) {
                throw new ValidationError('Failed asserting ' + currentTarget + ' has property ' + this._propertyStack[i], failureMessage);
            }
            currentTarget = currentTarget[this._propertyStack[i]];
        }
        this._assertType(currentTarget, this._type, this._typeName, failureMessage);
    }
};

/**
 * Execute an instance/type of check on target and type.
 *
 * @param                   target           The target to assert on.
 * @param {string|function} type             Either type of or constructor function.
 * @param {string}          typeName         The name of the constructor function for useful errors.
 * @param {string}          [failureMessage] The contextual message to throw if assertion failed.
 *
 * @private
 */
Assertion.prototype._assertType = function(target, type, typeName, failureMessage)
{
    if (typeof type === 'function') {
        if (!this._isInstanceOf(target, type)) {
            throw new ValidationError('Failed asserting ' + target + ' is instance of ' + typeName, failureMessage);
        }
    } else if (typeof type === 'string') {
        if (!this._isTypeOf(target, type)) {
            throw new ValidationError('Failed asserting ' + target + ' is type of ' + type, failureMessage);
        }
    }
};

/**
 * A simple instance of check.
 *
 * @param            value The value to test
 * @param {function} type  A constructor function.
 *
 * @returns {boolean}
 * @private
 */
Assertion.prototype._isInstanceOf = function(value, type)
{
    return (value instanceof type);
};

/**
 * A simple type of check.
 *
 * @param            value The value to test.
 * @param {function} type  The string representation of a JS type.
 *
 * @returns {boolean}
 * @private
 */
Assertion.prototype._isTypeOf = function(value, type)
{
    return (typeof value === type);
};

module.exports = Assertion;

